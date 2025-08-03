import {
  b1_s, b1_m, b1_l,
  b2_s, b2_m, b2_l,
  b3_s, b3_m, b3_l,
  b4_s, b4_m, b4_l,
  b5_s, b5_m, b5_l,
  b6_s, b6_m, b6_l,
  user
} from "./images";

const books = [
  {
    isbn: "97801431285400",
    bookTitle: "The Midnight Library",
    bookAuthor: "Matt Haig",
    yearOfPublication: 2020,
    publisher: "Viking",
    imageUrlS: b1_s,
    imageUrlM: b1_m,
    imageUrlL: b1_l,
    description: "A woman explores parallel lives in a magical library between life and death.",
    avgRating: 9.4,
    ratingsCount: 50,
    pages: 312,
    reviews: [
      {
        id: 'r1',
        user: 'Alice Johnson',
        userImg: user,
        rating: 4.8,
        date: 'July 30, 2025',
        text: 'Absolutely loved the pacing and character development. Could not put it down!'
      },
      {
        id: 'r2',
        user: 'Daniel Lee',
        userImg: user,
        rating: 4.2,
        date: 'July 28, 2025',
        text: 'A great story with a strong message. Some parts dragged, but overall fantastic.'
      }
    ]
  },
  {
    isbn: "97800623150071",
    bookTitle: "The Alchemist",
    bookAuthor: "Paulo Coelho",
    yearOfPublication: 1988,
    publisher: "HarperOne",
    imageUrlS: b2_s,
    imageUrlM: b2_m,
    imageUrlL: b2_l,
    description: "A shepherd boy dreams of treasure and embarks on a mystical journey to find it.",
    avgRating: 6.2,
    ratingsCount: 25,
    pages: 208,
    reviews: [],
  },
  {
    isbn: "97803072776712",
    bookTitle: "The Road",
    bookAuthor: "Cormac McCarthy",
    yearOfPublication: 2006,
    publisher: "Vintage",
    imageUrlS: b3_s,
    imageUrlM: b3_m,
    imageUrlL: b3_l,
    description: "A father and son travel through a post-apocalyptic wasteland in search of safety.",
    avgRating: 9.8,
    ratingsCount: 5,
    pages: 287,
    reviews: [
      {
        id: 'r1',
        user: 'Aarav Verma',
        userImg: user,
        rating: 4.1,
        date: 'June 30, 2025',
        text: 'Interesting concept, a little slow in the middle.'
      },
      {
        id: 'r2',
        user: 'Emily Davis',
        userImg: user,
        rating: 5.0,
        date: 'June 25, 2025',
        text: 'Masterpiece! One of the best books I’ve read this year.'
      },
      {
        id: 'r3',
        user: 'Noah Brown',
        userImg: user,
        rating: 4.5,
        date: 'June 20, 2025',
        text: 'Great characters and plot twists. Keeps you hooked.'
      },
      {
        id: 'r4',
        user: 'Isabella Garcia',
        userImg: user,
        rating: 4.3,
        date: 'June 18, 2025',
        text: 'Enjoyed it, though the ending felt rushed.'
      },
      {
        id: 'r5',
        user: 'Ethan Wilson',
        userImg: user,
        rating: 3.8,
        date: 'June 15, 2025',
        text: 'Not my favorite, but had some memorable moments.'
      },
      {
        id: 'r6',
        user: 'Olivia Martinez',
        userImg: user,
        rating: 4.7,
        date: 'June 10, 2025',
        text: 'Beautifully written. Emotional and engaging.'
      },
      {
        id: 'r7',
        user: 'Yash Midha',
        userImg: user,
        rating: 4.7,
        date: 'June 10, 2025',
        text: 'Beautifully written. Emotional and engaging.'
      }
    ],
  },
  {
    isbn: "97804390235283",
    bookTitle: "The Hunger Games 1 and 2: English, Hindi, etc. Book of the Year",
    bookAuthor: "Suzanne Collins",
    yearOfPublication: 2008,
    publisher: "Scholastic Press",
    imageUrlS: b4_s,
    imageUrlM: b4_m,
    imageUrlL: b4_l,
    description: "A young girl fights to survive a deadly televised competition in a dystopian world.",
    avgRating: 7.7,
    ratingsCount: 90,
    pages: 374,
    reviews: [
      {
        id: 'r1',
        user: 'Zara Singh',
        userImg: user,
        rating: 5.0,
        date: 'May 30, 2025',
        text: 'This book changed my perspective. Simply brilliant!'
      }
    ]

  },
  {
    isbn: "97805533867904",
    bookTitle: "Thinking, Fast and Slow",
    bookAuthor: "Daniel Kahneman",
    yearOfPublication: 2011,
    publisher: "Farrar, Straus and Giroux and 2 more that i dont know yet",
    imageUrlS: b5_s,
    imageUrlM: b5_m,
    imageUrlL: b5_l,
    description: "An exploration of the two systems that drive the way we think: fast and intuitive vs. slow and deliberate. An exploration of the two systems that drive the way we think: fast and intuitive vs. slow and deliberate. An exploration of the two systems that drive the way we think: fast and intuitive vs. slow and deliberate. An exploration of the two systems that drive the way we think: fast and intuitive vs. slow and deliberate. An exploration of the two systems that drive the way we think: fast and intuitive vs. slow and deliberate. An exploration of the two systems that drive the way we think: fast and intuitive vs. slow and deliberate. An exploration of the two systems that drive the way we think: fast and intuitive vs. slow and deliberate. An exploration of the two systems that drive the way we think: fast and intuitive vs. slow and deliberate. An exploration of the two systems that drive the way we think: fast and intuitive vs. slow and deliberate. An exploration of the two systems that drive the way we think: fast and intuitive vs. slow and deliberate. An exploration of the two systems that drive the way we think: fast and intuitive vs. slow and deliberate. An exploration of the two systems that drive the way we think: fast and intuitive vs. slow and deliberate. An exploration of the two systems that drive the way we think: fast and intuitive vs. slow and deliberate. An exploration of the two systems that drive the way we think: fast and intuitive vs. slow and deliberate.",
    avgRating: 8.5,
    ratingsCount: 100,
    pages: 499,
    reviews: [
      {
        id: 'r1',
        user: 'Maya Patel',
        userImg: user,
        rating: 4.6,
        date: 'July 15, 2025',
        text: 'A thrilling journey from start to finish. Highly recommended!'
      },
      {
        id: 'r2',
        user: 'Liam Chen',
        userImg: user,
        rating: 4.0,
        date: 'July 10, 2025',
        text: 'Good read overall, though I expected a bit more from the ending.'
      },
      {
        id: 'r3',
        user: 'Sara Kim',
        userImg: user,
        rating: 4.9,
        date: 'July 5, 2025',
        text: 'Loved every moment. A beautiful narrative with strong emotional depth.'
      }
    ],
  },
  {
    isbn: "97800611200845",
    bookTitle: "To Kill a Mockingbird",
    bookAuthor: "Harper Lee",
    yearOfPublication: 1960,
    publisher: "J.B. Lippincott & Co.",
    imageUrlS: b6_s,
    imageUrlM: b6_m,
    imageUrlL: b6_l,
    description: "A coming-of-age story addressing serious issues like racism and injustice in the Deep South.",
    avgRating: 3.4,
    ratingsCount: 10,
    pages: 281,
    reviews: [
      {
        id: 'r1',
        user: 'Lucas Park',
        userImg: user,
        rating: 4.4,
        date: 'May 15, 2025',
        text: 'A solid story with great pacing.'
      },
      {
        id: 'r2',
        user: 'Ananya Mehta',
        userImg: user,
        rating: 4.0,
        date: 'May 10, 2025',
        text: 'Well-written and immersive. Would recommend.'
      },
      {
        id: 'r3',
        user: 'William Scott',
        userImg: user,
        rating: 3.9,
        date: 'May 5, 2025',
        text: 'Good, but not as amazing as the hype suggested.'
      },
      {
        id: 'r4',
        user: 'Chloe Nguyen',
        userImg: user,
        rating: 4.6,
        date: 'May 1, 2025',
        text: 'Wonderful characters. Ill be thinking about this for a while.'
      }
    ]

  },
  {
    isbn: "97801431285406",
    bookTitle: "Quantum Shadows",
    bookAuthor: "Lena Brooks",
    yearOfPublication: 2017,
    publisher: "Nebula House",
    imageUrlS: b1_s,
    imageUrlM: b1_m,
    imageUrlL: b1_l,
    description: "A physicist discovers a parallel world while decoding ancient manuscripts.",
    avgRating: 7.9,
    ratingsCount: 34,
    pages: 410,
    reviews: [
      {
        id: 'r1',
        user: 'Priya Singh',
        userImg: user,
        rating: 4.3,
        date: 'March 12, 2025',
        text: 'Fascinating science and a gripping plot!'
      }
    ]
  },
  {
    isbn: "97800623150077",
    bookTitle: "The Forgotten Grove",
    bookAuthor: "Marcus Lee",
    yearOfPublication: 2019,
    publisher: "Greenleaf Press",
    imageUrlS: b2_s,
    imageUrlM: b2_m,
    imageUrlL: b2_l,
    description: "A botanist unearths secrets in a mystical forest that change her life forever.",
    avgRating: 8.2,
    ratingsCount: 21,
    pages: 295,
    reviews: [
      {
        id: 'r1',
        user: 'Sofia Turner',
        userImg: user,
        rating: 4.7,
        date: 'April 2, 2025',
        text: 'Enchanting and beautifully written.'
      }
    ]
  },
  {
    isbn: "97803072776718",
    bookTitle: "Digital Mirage",
    bookAuthor: "A.J. Carter",
    yearOfPublication: 2022,
    publisher: "Byte Books",
    imageUrlS: b3_s,
    imageUrlM: b3_m,
    imageUrlL: b3_l,
    description: "A hacker races against time to stop a rogue AI from taking over the world.",
    avgRating: 6.8,
    ratingsCount: 12,
    pages: 332,
    reviews: [
      {
        id: 'r1',
        user: 'Miguel Alvarez',
        userImg: user,
        rating: 3.9,
        date: 'June 18, 2025',
        text: 'Fast-paced and thrilling!'
      }
    ]
  },
  {
    isbn: "97804390235289",
    bookTitle: "Echoes of Tomorrow",
    bookAuthor: "Nina Patel",
    yearOfPublication: 2015,
    publisher: "Future Ink",
    imageUrlS: b4_s,
    imageUrlM: b4_m,
    imageUrlL: b4_l,
    description: "A time traveler must fix the past to save her future.",
    avgRating: 7.1,
    ratingsCount: 44,
    pages: 367,
    reviews: [
      {
        id: 'r1',
        user: 'Tom Becker',
        userImg: user,
        rating: 4.1,
        date: 'May 8, 2025',
        text: 'Loved the time travel twists!'
      }
    ]
  },
  {
    isbn: "978055338679010",
    bookTitle: "The Last Equation",
    bookAuthor: "Evelyn Grant",
    yearOfPublication: 2018,
    publisher: "Prime Numbers",
    imageUrlS: b5_s,
    imageUrlM: b5_m,
    imageUrlL: b5_l,
    description: "A mathematician’s search for a legendary formula leads to unexpected danger.",
    avgRating: 8.0,
    ratingsCount: 29,
    pages: 423,
    reviews: [
      {
        id: 'r1',
        user: 'Ravi Sharma',
        userImg: user,
        rating: 4.5,
        date: 'July 1, 2025',
        text: 'Smart and suspenseful.'
      }
    ]
  },
  {
    isbn: "978006112008411",
    bookTitle: "Starlit Waters",
    bookAuthor: "Jasmine Wu",
    yearOfPublication: 2021,
    publisher: "Blue Horizon",
    imageUrlS: b6_s,
    imageUrlM: b6_m,
    imageUrlL: b6_l,
    description: "A sailor’s journey across magical seas in search of a lost city.",
    avgRating: 7.5,
    ratingsCount: 18,
    pages: 278,
    reviews: [
      {
        id: 'r1',
        user: 'Elena Petrova',
        userImg: user,
        rating: 4.2,
        date: 'August 1, 2025',
        text: 'Magical and adventurous!'
      }
    ]
  },
  {
    isbn: "978014312854012",
    bookTitle: "Lost in the Clocktower",
    bookAuthor: "Samantha Reed",
    yearOfPublication: 2016,
    publisher: "Timeless Books",
    imageUrlS: b1_s,
    imageUrlM: b1_m,
    imageUrlL: b1_l,
    description: "A young inventor discovers a portal to the past inside an ancient clocktower.",
    avgRating: 8.1,
    ratingsCount: 27,
    pages: 354,
    reviews: [
      {
        id: 'r1',
        user: 'Henry Adams',
        userImg: user,
        rating: 4.0,
        date: 'March 3, 2025',
        text: 'Inventive and fun, with a twisty plot!'
      }
    ]
  },
  {
    isbn: "978006231500713",
    bookTitle: "The Glass Orchard",
    bookAuthor: "Priya Desai",
    yearOfPublication: 2023,
    publisher: "Crystal Leaf",
    imageUrlS: b2_s,
    imageUrlM: b2_m,
    imageUrlL: b2_l,
    description: "A family’s secrets unravel in a mysterious orchard where nothing is as it seems.",
    avgRating: 7.3,
    ratingsCount: 19,
    pages: 299,
    reviews: [
      {
        id: 'r1',
        user: 'Olga Ivanova',
        userImg: user,
        rating: 3.9,
        date: 'April 10, 2025',
        text: 'Atmospheric and beautifully written.'
      }
    ]
  },
  {
    isbn: "978030727767114",
    bookTitle: "Neon Skyline",
    bookAuthor: "Alex Kim",
    yearOfPublication: 2018,
    publisher: "Urban Pulse",
    imageUrlS: b3_s,
    imageUrlM: b3_m,
    imageUrlL: b3_l,
    description: "A detective navigates a futuristic city to solve a high-profile disappearance.",
    avgRating: 7.8,
    ratingsCount: 32,
    pages: 381,
    reviews: [
      {
        id: 'r1',
        user: 'Fatima Noor',
        userImg: user,
        rating: 4.2,
        date: 'May 22, 2025',
        text: 'Great world-building and suspense!'
      }
    ]
  },
  {
    isbn: "978043902352815",
    bookTitle: "Shadow of the Lotus",
    bookAuthor: "Kenji Watanabe",
    yearOfPublication: 2014,
    publisher: "Eastern Wind",
    imageUrlS: b4_s,
    imageUrlM: b4_m,
    imageUrlL: b4_l,
    description: "A martial artist seeks redemption in a land ruled by ancient traditions.",
    avgRating: 8.4,
    ratingsCount: 41,
    pages: 367,
    reviews: [
      {
        id: 'r1',
        user: 'Maria Lopez',
        userImg: user,
        rating: 4.5,
        date: 'June 2, 2025',
        text: 'Powerful story and vivid setting.'
      }
    ]
  },
  {
    isbn: "978055338679016",
    bookTitle: "The Infinite Canvas",
    bookAuthor: "Luca Romano",
    yearOfPublication: 2020,
    publisher: "Palette House",
    imageUrlS: b5_s,
    imageUrlM: b5_m,
    imageUrlL: b5_l,
    description: "An artist discovers his paintings can alter reality, with unexpected consequences.",
    avgRating: 7.6,
    ratingsCount: 23,
    pages: 412,
    reviews: [
      {
        id: 'r1',
        user: 'Grace Miller',
        userImg: user,
        rating: 4.1,
        date: 'July 12, 2025',
        text: 'Creative and thought-provoking!'
      }
    ]
  },
  {
    isbn: "978006112008417",
    bookTitle: "The Nightingale",
    bookAuthor: "Kristin Hannah",
    yearOfPublication: 2015,
    publisher: "St. Martin's Press",
    imageUrlS: b6_s,
    imageUrlM: b6_m,
    imageUrlL: b6_l,
    description: "Two sisters in France during World War II embark on separate paths toward survival, love, and freedom.",
    avgRating: 8.7,
    ratingsCount: 60,
    pages: 440,
    reviews: [
      {
        id: 'r1',
        user: 'John Doe',
        userImg: user,
        rating: 4.8,
        date: 'August 15, 2025',
        text: 'An emotional rollercoaster. Beautifully written and deeply moving.'
      },
      {
        id: 'r2',
        user: 'Jane Smith',
        userImg: user,
        rating: 4.9,
        date: 'August 10, 2025',
        text: 'A gripping tale of courage and love. Couldn’t recommend more!'
      }
    ]
  },
  {
    isbn: "978006112008418",
    bookTitle: "The Nightingale",
    bookAuthor: "Kristin Hannah",
    yearOfPublication: 2015,
    publisher: "St. Martin's Press",
    imageUrlS: b6_s,
    imageUrlM: b6_m,
    imageUrlL: b6_l,
    description: "Two sisters in France during World War II embark on separate paths toward survival, love, and freedom.",
    avgRating: 8.7,
    ratingsCount: 60,
    pages: 440,
    reviews: [
      {
        id: 'r1',
        user: 'John Doe',
        userImg: user,
        rating: 4.8,
        date: 'August 15, 2025',
        text: 'An emotional rollercoaster. Beautifully written and deeply moving.'
      },
      {
        id: 'r2',
        user: 'Jane Smith',
        userImg: user,
        rating: 4.9,
        date: 'August 10, 2025',
        text: 'A gripping tale of courage and love. Couldn’t recommend more!'
      }
    ]
  }
];

export default books;
