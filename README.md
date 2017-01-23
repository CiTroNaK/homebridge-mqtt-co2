# homebridge-mqtt-co2
Get CO2 data via MQTT in Homebridge

Installation
--------------------
    sudo npm install -g homebridge-mqtt-co2


Sample HomeBridge Configuration
--------------------
    {
      "bridge": {
        "name": "HomeBridge",
        "username": "CC:33:3B:D3:CE:32",
        "port": 51826,
        "pin": "321-45-123"
      },

      "description": "",

      "accessories": [
        {
          "accessory": "mqtt-co2",
          "name": "Living Room CO2",
          "url": "mqtt://localhost",
          "topic": "home/livingroom/co2",
          "username": "username",
          "password": "password"
        }
      ],

      "platforms": []
    }

----
####  Credits
[homebridge-mqtt-temperature](https://github.com/mcchots/homebridge-mqtt-temperature)

[homebridge-mqttswitch](https://github.com/ilcato/homebridge-mqttswitch)

[homebridge-mqttgaragedoor](https://github.com/tvillingett/homebridge-mqttgaragedoor)

[homebridge-ds18b20](https://github.com/DanTheMan827/homebridge-ds18b20)
