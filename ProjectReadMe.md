● Identify your users
Developers that want a modular chat/transactional system to incorporate into their projects and a way to obscure/protect/silo these transactions/communications via blockchain.

● Identify the problem you’re 
solving for them
Blockchain/database/server/client navigation can be messy. I hope to provide scaffolding for future projects so that they can take my rough template and build upon it

● What are your user stories
Developers are excited about blockchain, but it is still a relatively new and obscure resource. I hope to clarify its use and enable them to build the experience necessary
to bring it into their personal and job related projects.

● What are your core features? 
(MVP scope)
Quite alot of core features are required to get this up and running. I may not get to them all. In descending priority:
 - Functioning CRUD Database running on MongoDB
 - Corresponding React/Redux
 - Webpack server to handle production/development environments
 - Server routing to manage requests and successfully coordinate specific routes
 - Front end client with input fields and fetch requests to both the database & AWS blockchain service running Etherium nodes
 - AWS integration at some point to their Etherium node instances

● What are technical challenges 
do you expect?
There are a whole host of issues:
 - Issues with becoming familiary with MongoDB configurations and setup. Properly managing client requests to the backend and the reverse.
 - Configuring a modular front end with input fields that kick off fetch requests that go through the proper channels
 - Managing state
 - Setting up and modifying a Webpack Server
 
● What are your stretch goals
 - At the core I need to make a modular chat application that is plug n play. This requires a database, server, and front end to be built
 - At a minimum I need the database and server 
 - Next stretch is front-end
 - Maximum stretch is fully functioning integration with AWS blockchain Ethereum node network