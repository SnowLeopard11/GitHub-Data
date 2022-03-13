import bg from "./bg"
import databox from "./databox"
import icon from "./icon"
import nodata from "./nodata"
import loading from "./loading"
import github from "./github"

const components = {
    bg,
    databox,
    icon,
    nodata,
    loading,
    github
};

const install = (Vue = {}) =>{
    if(install.installed)return;
    Object.keys(components).forEach(component =>{
        Vue.component(components[component].name,components[component]);
    });
    Vue.prototype.$notice = Notification;
    install.installed = true;
};
install.installed = false;
if(typeof window !== "undefined" && window.Vue){
    install(window.Vue);
    install.installed = true;
}

const Vcomp = {
    ...components,
    install
};

export default Vcomp;