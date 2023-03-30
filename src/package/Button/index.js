import component from './index.vue';
export default {
    install : (Vue) => {
		Vue.component(component.name, component);
	}
}