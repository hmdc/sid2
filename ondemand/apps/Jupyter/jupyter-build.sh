## sh Anaconda3-2021.05-Linux-x86_64.sh 
## installed in  /n/helmod/apps/centos7/Core/Anaconda3/2021.05-jupyterood-fasrc01

### >>> conda initialize >>>
### !! Contents within this block are managed by 'conda init' !!
##__conda_setup="$('/n/helmod/apps/centos7/Core/Anaconda3/2021.05-jupyterood-fasrc01/x/bin/conda' 'shell.bash' 'hook' 2> /dev/null)"
##if [ $? -eq 0 ]; then
##    eval "$__conda_setup"
##else
##    if [ -f "/n/helmod/apps/centos7/Core/Anaconda3/2021.05-jupyterood-fasrc01/x/etc/profile.d/conda.sh" ]; then
##        . "/n/helmod/apps/centos7/Core/Anaconda3/2021.05-jupyterood-fasrc01/x/etc/profile.d/conda.sh"
##    else
##        export PATH="/n/helmod/apps/centos7/Core/Anaconda3/2021.05-jupyterood-fasrc01/x/bin:$PATH"
##    fi
##fi
##unset __conda_setup
### <<< conda initialize <<<

## install nodejs necessary to build some jupyterlab extensions
pip install --upgrade jupyterlab
conda install -y -c conda-forge/label/main nodejs 

## integration with lmod
pip install  jupyterlmod
mkdir /n/helmod/apps/centos7/Core/Anaconda3/2021.05-jupyterood-fasrc01/x/lib/python3.8/site-packages/jupyterlmod/static
jupyter nbextension install --sys-prefix --py jupyterlmod 
jupyter serverextension enable --sys-prefix --py jupyterlmod
jupyter nbextension enable --sys-prefix --py jupyterlmod
sed -i 's/Softwares/Modules/' /n/helmod/apps/centos7/Core/Anaconda3/2021.05-jupyterood-fasrc01/x/share/jupyter/nbextensions/jupyterlmod/main.js 
jupyter labextension install jupyterlab-lmod
sed -i 's/Softwares/Modules/' /n/helmod/apps/centos7/Core/Anaconda3/2021.05-jupyterood-fasrc01/x/share/jupyter/lab/staging/node_modules/jupyterlab-lmod/lib/jupyterlab/src/index.js
for i in `grep -R -l Softwares /n/helmod/apps/centos7/Core/Anaconda3/2021.05-jupyterood-fasrc01/x/share/jupyter/lab  ` ; do sed -i 's/Softwares/Modules/g' $i ; done 

jlpm add jupyterlab_toastify

pip install  jupyter_server 
conda install -y -c conda-forge mamba_gator
jupyter labextension install @mamba-org/gator-lab
conda install -y nb_conda_kernels

## TOC extension 
jupyter labextension install @jupyterlab/toc

## https://github.com/aquirdTurtle/Collapsible_Headings
pip install aquirdturtle_collapsible_headings

#https://github.com/jupyter-server/jupyter-resource-usage
conda install -c conda-forge jupyter-resource-usage

## no longer usable. ... review in future reinstallations
##jupyter nbextension install nb_conda --py --sys-prefix 
##jupyter nbextension enable nb_conda --py --sys-prefix
##jupyter serverextension enable nb_conda --py --sys-prefix
##pip  install  jupyter_conda
##jupyter labextension install jupyterlab_toastify jupyterlab_conda
