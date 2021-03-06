var strs = require('stringstream');

function tagsQueryString(tags, itemid, result) {
  /**
   * Challenge:
   * This function is recursive, and a little complicated.
   * Can you refactor it to be simpler / more readable?
   */
  const length = tags.length;
  return length === 0
    ? `${result};`
    : tags.shift() &&
        tagsQueryString(
          tags,
          itemid,
          `${result}($${tags.length + 1}, ${itemid})${length === 1 ? '' : ','}`
        );
}

module.exports = function(postgres) {
  return {
    async createUser({ fullname, email, password }) {
      const newUserInsert = {
        text:
          'INSERT INTO users(fullname,email,password) VALUES($1,$2,$3)RETURNING *', // @TODO: Authentication - Server
        values: [fullname, email, password]
      };
      try {
        const user = await postgres.query(newUserInsert);
        return user.rows[0];
      } catch (e) {
        switch (true) {
          case /users_fullname_key/.test(e.message):
            throw 'An account with this username already exists.';
          case /users_email_key/.test(e.message):
            throw 'An account with this email already exists.';
          default:
            throw 'There was a problem creating your account.';
        }
      }
    },

    async getUserAndPasswordForVerification(email) {
      const findUserQuery = {
        text: 'SELECT * FROM users WHERE users.email=$1', // @TODO: Authentication - Server
        values: [email]
      };
      try {
        const user = await postgres.query(findUserQuery);
        if (!user) throw 'User was not found.';
        return user.rows[0];
      } catch (e) {
        throw 'User was not found.';
      }
    },

    async getUserById(id) {
      const findUserQuery = {
        text: 'SELECT * FROM users WHERE users.id=$1;', // @TODO: Basic queries
        values: [id]
      };
      try {
        const user = await postgres.query(findUserQuery);
        return user.rows[0];
      } catch (e) {
        throw 'User was not found.';
      }
    },

    async getItems(idToOmit) {
      let text = `SELECT item.id, item.title,item.description,item.created, item.ownerid, item.borrowerid, up.data as imageurl 
      FROM items item
      INNER JOIN uploads up
      ON up.itemid = item.id`;
      if (idToOmit) {
        text = `SELECT item.id, item.title,item.description,item.created, item.ownerid, item.borrowerid, up.data as imageurl 
        FROM items item
        INNER JOIN uploads up
        ON up.itemid = item.id
        WHERE item.ownerid != $1 AND item.borrowerid is NULL`;
      }

      try {
        const items = await postgres.query({
          text: text,
          values: idToOmit ? [idToOmit] : []
        });

        return items.rows;
      } catch (e) {
        console.log(e);
        throw 'Items were not found.';
      }
    },
    async getItemsForUser(id) {
      try {
        const items = await postgres.query({
          /**
           *  @TODO: Advanced queries
           *  Get all Items. Hint: You'll need to use a LEFT INNER JOIN among others
           */
          text: `SELECT item.id, item.title,item.description,item.created, item.ownerid, item.borrowerid, up.data as imageurl 
          FROM items item
          INNER JOIN uploads up
          ON up.itemid = item.id
          WHERE item.ownerid = $1`,
          values: [id]
        });
        return items.rows;
      } catch (e) {
        throw 'Items for user were not found.';
      }
    },
    async getBorrowedItemsForUser(id) {
      try {
        const items = await postgres.query({
          /**
           *  @TODO: Advanced queries
           *  Get all Items. Hint: You'll need to use a LEFT INNER JOIN among others
           */
          text: `SELECT * FROM items WHERE items.borrowerid =$1`,
          values: [id]
        });
        return items.rows;
      } catch (e) {
        throw 'Borrowed items were not found.';
      }
    },
    async getTags() {
      try {
        const alltags = await postgres.query('SELECT * FROM tags');
        return alltags.rows;
      } catch (e) {
        throw 'Tags were not found.';
      }
    },
    async getTagsForItem(id) {
      const tagsQuery = {
        text: `SELECT * FROM tags INNER JOIN itemtags ON itemtags.tagid = tags.id WHERE itemtags.itemid = $1`, // @TODO: Advanced queries
        values: [id]
      };
      try {
        const gettagsid = await postgres.query(tagsQuery);
        return gettagsid.rows;
      } catch (e) {
        throw 'Tags for item were not found.';
      }
    },

    async saveNewItem({ item, image, user }) {
      /**
       *  @TODO: Adding a New Item
       *
       *  Adding a new Item to Posgtres is the most advanced query.
       *  It requires 3 separate INSERT statements.
       *
       *  All of the INSERT statements must:
       *  1) Proceed in a specific order.
       *  2) Succeed for the new Item to be considered added
       *  3) If any of the INSERT queries fail, any successful INSERT
       *     queries should be 'rolled back' to avoid 'orphan' data in the database.
       *
       *  To achieve #3 we'll ue something called a Postgres Transaction!
       *  The code for the transaction has been provided for you, along with
       *  helpful comments to help you get started.
       *
       *  Read the method and the comments carefully before you begin.
       */

      return new Promise((resolve, reject) => {
        /**
         * Begin transaction by opening a long-lived connection
         * to a client from the client pool.
         */
        postgres.connect((err, client, done) => {
          try {
            // Begin postgres transaction
            client.query('BEGIN', err => {
              // Convert image (file stream) to Base64
              const imageStream = image.stream.pipe(strs('base64'));

              let base64Str = 'data:image/*;base64, ';
              imageStream.on('data', data => {
                base64Str += data;
              });

              imageStream.on('end', async () => {
                // Image has been converted, begin saving things
                const { title, description, tags } = item;

                const newItemInsert = {
                  text: `
                    INSERT INTO items (title,description, ownerid) VALUES ($1, $2, $3)
                    RETURNING *`,
                  values: [title, description, user.id]
                };
                // Generate new Item query
                // @TODO
                // -------------------------------

                // Insert new Item

                const newItem = await client.query(newItemInsert);
                const itemid = newItem.rows[0].id;

                // -------------------------------

                const imageUploadQuery = {
                  text:
                    'INSERT INTO uploads (itemid, filename, mimetype, encoding, data) VALUES ($1, $2, $3, $4, $5) RETURNING *',
                  values: [
                    itemid,
                    image.filename,
                    image.mimetype,
                    'base64',
                    base64Str
                  ]
                };
                try {
                  // Upload image
                  await client.query(imageUploadQuery);
                } catch (e) {
                  console.log(e);
                }

                // Generate tag relationships query (use the'tagsQueryString' helper function provided)
                // @TODO
                // -------------------------------
                const tagsQuery = {
                  text: `
                    INSERT INTO itemtags(tagid, itemid) VALUES ${tagsQueryString(
                      [...tags],
                      itemid,
                      ''
                    )}`,
                  values: tags.map(tag => tag.id)
                };
                try {
                  await client.query(tagsQuery);
                } catch (e) {
                  console.log(e);
                }
                // Insert tags
                // @TODO
                // -------------------------------

                // Commit the entire transaction!
                client.query('COMMIT', err => {
                  if (err) {
                    throw err;
                  }
                  // release the client back to the pool
                  done();
                  // Uncomment this resolve statement when you're ready!
                  resolve(newItem.rows[0]);
                  // -------------------------------
                });
              });
            });
          } catch (e) {
            // Something went wrong
            client.query('ROLLBACK', err => {
              if (err) {
                throw err;
              }
              // release the client back to the pool
              done();
            });
            switch (true) {
              case /uploads_itemid_key/.test(e.message):
                throw 'This item already has an image.';
              default:
                throw e;
            }
          }
        });
      });
    }
  };
};
