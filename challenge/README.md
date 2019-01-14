# Youper Challenge

Project on developmemt challenge 

## Using this project

### Install

```bash
#download of project
git clone https://github.com/fabiohoalves/youper
cd youper/challenge/
```


```bash
#install ionic and cordova and karma
npm install -g ionic cordova and karma
```

```bash
#install of project packages
npm install
```

```bash
#install of tests
npm install -g karma
```

### Run App

```bash
#configure platform targets
ionic cordova platform add ios android
```
```bash
#list emulate for the platforms
ionic cordova emulate --list
```

```bash
#run app on emulate (build Ionic Cordova with Xcode 10 -- --buildFlag="-UseModernBuildSystem=0" )
#ionic info (more information)
ionic cordova emulate ios
```

```bash
#run app on device
ionic cordova run ios --device
ionic cordova run android --device
```

```bash
# run app on local browser
ionic serve (localhost:8100)
```
### Run Tests

```bash
#run tests (Chrome is default browser)
#if necessary change browser in Karma.conf.js -> browsers: ['Chrome'],
karma start
```


## Author

* **Fabio Alves** - [fabiohoalves](https://github.com/fabiohoalves)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

