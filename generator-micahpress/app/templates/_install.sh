#!/usr/bin/env bash

echo "---Goodmorning, master---"
echo "Updating packages list"
sudo apt-get update

echo "---MySQL time---"
sudo debconf-set-selections <<< 'mysql-server mysql-server/root_password password root'
sudo debconf-set-selections <<< 'mysql-server mysql-server/root_password_againt password root'


sudo apt-get install -y curl vim python-software-properties

echo "--- Installing base packages ---"
sudo add-apt-repository -y ppa:ondrej/php5

echo "---Updating the packages---"
sudo apt-get update

echo "---Installing PHP-specific packages---"
sudo apt-get install -y php5 apache2 libapache2-mod-php5 curl php5-curl php5-gd php5-mcrypt mysql-server-5.5 php5-mysql git-core

echo "---Installing, configuring xedebu---"
sudo apt-get install -y php5-xdebug

cat << EOF | sudo tee -a /etc/php5/mods-available/xdebug.ini
xdebug.scream=1
xdebug.cli_color=1
xdebug.show_local_vars=1
EOF


echo "---Modrewrite---"
sudo a2enmod rewrite

echo "---Setting docroot to public directory---"
sudo rm -rf /var/www
sudo ln -fs /vagrant/public /var/www

echo "---Turn on error reporting---"
sed -i "s/error_reporting = .*/error_reporting = E_ALL/" /etc/php5/apache2/php.ini 
sed -i "s/display_errors = .*/display_errors = On/" /etc/php5/apache2/php.ini

echo "---Restart apache---"
sudo service apache2 restart

echo "---Composer---"
curl -sS https://getcomposer.org/installer | php
sudo mv composer.phar /usr/local/bin/composer

echo "---Set up vim---"
git clone git://github.com/mindofmicah/vim-info.git /home/vagrant/vim-info
cp -av /home/vagrant/vim-info/.vim /home/vagrant/.vim
cp -av /home/vagrant/vim-info/.vimrc /home/vagrant/.vimrc
sudo chown vagrant:vagrant -R /home/vagrant/.vim*

echo "--All set----"
