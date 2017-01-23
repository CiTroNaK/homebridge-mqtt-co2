var Service, Characteristic;
var mqtt    = require('mqtt');

module.exports = function(homebridge) {
  Service = homebridge.hap.Service;
  Characteristic = homebridge.hap.Characteristic;
  homebridge.registerAccessory("homebridge-mqtt-co2", "mqtt-co2", CO2Accessory);
}

function CO2Accessory(log, config) {
  this.log = log;
  this.name = config["name"];
  this.url = config['url'];
  this.topic = config['topic'];
  this.client_Id 		= 'mqttjs_' + Math.random().toString(16).substr(2, 8);7
  this.options = {
    keepalive: 10,
    clientId: this.client_Id,
    protocolId: 'MQTT',
    protocolVersion: 4,
    clean: true,
    reconnectPeriod: 1000,
    connectTimeout: 30 * 1000,
    will: {
      topic: 'WillMsg',
      payload: 'Connection Closed abnormally..!',
      qos: 0,
      retain: false
    },
    username: config["username"],
    password: config["password"],
    rejectUnauthorized: false
  };

  this.service = new Service.CarbonDioxideSensor(this.name);
  this.client  = mqtt.connect(this.url, this.options);
  var that = this;
  this.client.subscribe(this.topic);

  this.client.on('message', function (topic, message) {
    // message is Buffer
    data = JSON.parse(message);
    if (data === null) {return null}
    that.co2 = parseFloat(data);
});

  this.service
    .getCharacteristic(Characteristic.CarbonDioxideLevel)
    .on('get', this.getLevel.bind(this));

  this.service
    .getCharacteristic(Characteristic.CarbonDioxideDetected)
    .on('get', this.getDetected.bind(this));
}

CO2Accessory.prototype.getLevel = function(callback) {
    this.log(this.name, " - MQTT : ", this.co2);
    callback(null, this.co2);
}

CO2Accessory.prototype.getDetected = function(callback) {
    var result = (this.co2 > 1000 ? Characteristic.CarbonDioxideDetected.CO2_LEVELS_ABNORMAL : Characteristic.CarbonDioxideDetected.CO2_LEVELS_NORMAL);
    callback(null, result);
}

CO2Accessory.prototype.getServices = function() {
  return [this.service];
}
