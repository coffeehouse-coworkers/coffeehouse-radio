# -*- mode: ruby -*-
# vi: set ft=ruby :

PROJECT_NAME = "coffeehouse-radio-dev"
LOCAL_PRIVATE_NETWORK_ADDRESS = "192.168.33.10"
VM_MEMORY = "512" # mb
VAGRANTFILE_API_VERSION = "2"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|

  # Base Box
  config.vm.box = "ubuntu/trusty64"
  config.vm.hostname = PROJECT_NAME

  # Due to ubuntu/trusty64 bug that does not allow for direct passing of ssh keys
  # We have to create a file in the etc directory that allows sudo access to the ssh socket
  config.vm.provision :shell do |shell|
    shell.inline = "touch $1 && chmod 0440 $1 && echo $2 > $1"
    shell.args = %q{/etc/sudoers.d/root_ssh_agent "Defaults env_keep += \"SSH_AUTH_SOCK\""}
  end

  # provision scripts
  config.vm.provision :shell, path: "./bin/general.setup.sh", privileged: false

  # Create a private network, which allows host-only access to the machine
  config.vm.network "private_network", ip: LOCAL_PRIVATE_NETWORK_ADDRESS

  # Enable SSH agent forwarding (for github key)
  config.ssh.forward_agent = true

  # virtual box provider config  
  config.vm.provider "virtualbox" do |vb|
    vb.name = PROJECT_NAME

    # Use VBoxManage to customize the VM. For example to change memory:
    vb.customize ["modifyvm", :id, "--memory", VM_MEMORY]
  end
end