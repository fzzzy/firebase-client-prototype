# firebase-client-prototype
Prototype of a Firebase client

# room example

  var room = {
    title: "My Room",
    pages: {
      "uuid": <Page />
    },
    chat: <Chat />,
    participants: {
      "uuid": <Person />
    },
    present: <Presence />
  };

  var page = {
    url: "http://www.nytimes.com/interactive/2016/02/14/us/politics/100000004209293.mobile.html?_r=0",
    canonicalUrl: "http://www.nytimes.com/interactive/2016/02/14/us/politics/how-scalias-death-could-affect-major-supreme-court-cases-in-the-2016-term.html",
    title: "How a Vacancy on the Supreme Court Affects Cases in the 2015-16 Term - The New York Times",
    openGraph: {
      type: "article",
      title: "How a Vacancy on the Supreme Court Affects Cases in the 2015-16 Term",
      description: "The empty seat left by Justice Antonin Scalia’s death leaves the court with two basic options for cases left on the docket this term if the justices are deadlocked at 4 to 4.",
      images: [<Image />],
      "article:author": "http://topics.nytimes.com/top/reference/timestopics/people/l/adam_liptak/index.html",
      "article:tag": ["Supreme Court (US)", "Scalia, Antonin"], // ...
    },
    twitterCard: {
      card: "summary_large_image",
      site: "@nytimes", // ...
    },
    meta: {
      description: "..." // ...
    },
    created: <Date />,
    creatorId: "authorUuid",
    images: [<Image />]
  };

  var chat = {
    earliest: "YYYY-MM-DD",
    latest: "YYYY-MM-DD",
    "YYYY-MM-DD": <ChatLog />
  };

  var chatLog = {
    messages: [
      {
        id: "uuid",
        type: "text",
        date: <Date />,
        authorId: "personUuid",
        text: "Hey everybody!"
      },
      {
        id: "uuid",
        type: "visit",
        date: <Date />,
        authorId: "personUuid",
        page: <Page />
      },
      {
        id: "uuid",
        type: "leave",
        date: <Date />,
        authorId: "personUuid"
      },
      {
        id: "uuid",
        type: "join",
        date: <Date />,
        authorId: "personUuid"
      },
      {
        id: "uuid",
        type: "tabShare",
        date: <Date />,
        finished: <Date />, // or null,
        authorId: "personUuid",
        participants: ["otherPersonUuid"]
      }
    ]
  };

  var person = {
    displayName: "Name",
    color: [r, g, b],
    initials: "N",
    avatar: "url"
  };

  var presence = {
    "personUuid": {
      entered: <Date />,
      lastPing: <Date />,
      left: <Date /> // or null/missing
    }
  };

  var date = 134949324; // timestamp?

  var image = {
    url: "http://whatever.com",
    width: 200, // px, if known
    height: 100, // px, if known
    alt: "some alt text", // if any
    title: "some title" // if any
  };
