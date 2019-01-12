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

### Run App

You can run the app in different ways:

```bash
#configure platform targets
ionic cordova platform add ios android
```
```bash
#list emulate for the platforms
ionic cordova emulate --list
```

```bash
#run app on emulate
ionic cordova run ios --target="iPhone-8, 12.1" -- --buildFlag="-UseModernBuildSystem=0"
ionic cordova run android
```

```bash
#run app on device
ionic cordova run ios --device
ionic cordova run android
```

```bash
# run app on local browser
ionic serve (localhost:8100)
```
### Run Tests

```bash
#run tests
karma start
```


## Author

* **Fabio Alves** - *Initial work* - [fabiohoalves](https://github.com/fabiohoalves)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

