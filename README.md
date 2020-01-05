# IOTA-SC-tracking
This app illustrates how to track packaging units in logistics with IOTA. 

Visit the app on https://iota-tracking-system.firebaseapp.com.

The following functions could be part of the tracking system:

- Authenticate a tracking device :heavy_check_mark:
- Register a packaging unit in order to track it :heavy_check_mark: 
- Register a freight containing multiple packaging units
- Fetch the tracking data from the tangle and display it :heavy_check_mark:

:warning: This code was written by a beginner. 

## Table of Contents

- [Project setup](#project-setup)
- [Getting started](#getting-started)
- [Support](#support)
- [Contributing](#contributing)
- [Credits](#credits)

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


## Getting started

**Prerequisites**

- [NodeJS](https://nodejs.org/en/) installed
- Developer account on [remote.it](https://remote.it/) to connect this app to your Raspberry Pi.

**Installation**

You can download this repo to run ```npm install``` to install all dependencies automatically. 
All dependencies are visible in the package.json file.

Add a .env file with the following content: 
```
VUE_APP_REMOTEIT_DEVELOPER_KEY=[your remoteit developer key]
VUE_APP_REMOTEIT_USERNAME=[your remoteit username]
VUE_APP_REMOTEIT_PASSWORD=[your remoteit password]
VUE_APP_REMOTEIT_DEVICE_ADDRESS=[your remoteit device address] 
VUE_APP_PUBLIC_KEY_DEVICE=[a public key to check the JSON Web token of your iot device]
VUE_APP_SEED=[IOTA seed to register a packaging unit] 
VUE_APP_SIDE_KEY=[IOTA side key to register a packaging unit]
VUE_APP_GNSS_SEED=[IOTA seed to fetch the tracking data]
``` 
The remote.it device address is the service ID of your device visible in your remote.it account.

To generate a seed, run ```cat /dev/urandom |tr -dc A-Z9|head -c${1:-81}```

## Support

Please [open an issue](https://github.com/flooji/IOTA-Raspberry-API/issues/new) for support.

## Contributing

If you are interesting in pushing this idea further I would be more than happy to collaborate with you. :blush:
Please contribute using [Github Flow](https://guides.github.com/introduction/flow/). Create a branch, add commits, and [open a pull request](https://github.com/flooji/IOTA-Raspberry-API/compare/).

## Credits

Credits to the IOTA foundation whose [tutorials](https://docs.iota.org/docs/client-libraries/0.1/mam/js/create-restricted-channel) helped me to realize this project.

