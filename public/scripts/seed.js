require('dotenv').config();
const mongoose = require('mongoose');
const Song = require('../../db');

mongoose.connect(process.env.MONGODB_URI)
    .then(async () => {
        await Song.deleteMany({}); // clears existing data

        await Song.insertMany([
            {
                title: 'Strobe',
                artist: 'deadmau5',
                year: 2010,
                tags: ['melodic house', 'electronic', 'progressive', 'english']
            },
            {
                title: 'Fly - FKJ Remix',
                artist: 'June Marieezy',
                year: 2015,
                tags: ['neo-soul', '2010s', 'nu-jazz', 'english']
            },
            {
                title: 'Let\'s Do Something That We\'ve Never Done',
                artist: 'PLGRMS',
                year: 2020,
                tags: ['indie pop', 'alt-soul', '2020s', 'english']
            }
        ]);

        console.log('Seeded successfully');
        mongoose.connection.close();
    })
    .catch(err => console.error(err));