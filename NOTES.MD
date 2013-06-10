Environement setup
- Install nodejs : 'sudo apt-get install nodejs'
- Install git : 'sudo apt-get install git'
- Install gpio-admin : 

git clone git://github.com/quick2wire/quick2wire-gpio-admin.git
cd quick2wire-gpio-admin
make
sudo make install
sudo adduser $USER gpio

- Install node modules : 'sudo npm -g install restify pi-gpio grunt grunt-cli grunt-contrib-uglify'

- Running the server in background : 'forever start app.js'

- Code conventions : http://nodeguide.com/style.html
