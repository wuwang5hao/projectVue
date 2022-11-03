import Vue from 'vue';

function broadcast(componentName, eventName, params) {
  this.$children.forEach(child => {
    const name = child.$options.name;

    if (name === componentName) {
      child.$emit.apply(child, [eventName].concat(params));
    } else {
      // todo 如果 params 是空数组，接收到的会是 undefined
      broadcast.apply(child, [componentName, eventName].concat([params]));
    }
  });
}

export function addUtil(key, instance, Vue = null) {
  if (Vue) {
    Vue.prototype[key] = instance;
    Vue[key] = instance;
  } else if (window.Vue) {
    window.Vue.prototype[key] = instance;
    window.Vue[key] = instance;
  }
  window[key] = instance;
}

export class VueUtil {
  constructor(router, store) {
    this.router = router;
    this.store = store;
  }
  vueName(type) {
    const name = type.sealedOptions ? type.sealedOptions.name : type.name;

    return name
      ? name[0].toUpperCase() + name.substr(1).toLowerCase() // title case
      : 'Anonymous';
  }
  // go back
  goBack(defpath = '/home') {
    if (window.history.length > 1) {
      this.router.go(-1);
    } else {
      this.router.push(defpath);
    }
  }
  dispatch(vm, componentName, eventName, params) {
    let parent = vm.$parent || vm.$root;
    let name = parent.$options.name;

    while (parent && (!name || name !== componentName)) {
      parent = parent.$parent;

      if (parent) {
        name = parent.$options.name;
      }
    }
    if (parent) {
      parent.$emit.apply(parent, [eventName].concat(params));
    }
  }
  broadcast(vm, componentName, eventName, params) {
    broadcast.call(vm, componentName, eventName, params);
  }
}

export class ComponentUtil {
  constructor(store, router) {
    this.store = store;
    this.router = router;
  }
  create({ cls, clsprops = {}, vueprops = {}, on = {} }) {
    return this.__create({ cls, clsprops, vueprops, on });
  }
  createCustom({ render, vueprops = {} }) {
    return this.__create({ vueprops, render });
  }
  __create({ cls = null, clsprops = {}, vueprops = {}, on = {}, render = null }) {
    let vobj = null;
    if (!('store' in vueprops)) {
      vueprops['store'] = this.store;
    }
    if (!('router' in vueprops)) {
      vueprops['router'] = this.router;
    }
    vueprops = Object.assign(vueprops, {
      render(h) {
        let vnode = this;
        let onHide = on['on-hide'];
        let hideFunc = () => {
          if (onHide) {
            onHide();
          }
          vobj.close();
        };
        on['on-hide'] = hideFunc;
        if (render) {
          vobj.instance = render(h, vnode);
        } else {
          vobj.instance = h(cls, {
            props: clsprops,
            on: on
          });
        }
        return vobj.instance;
      },
      methods: {
        close() {
          this.$emit('onClose', vobj.instance, this);
        }
      }
    });
    vobj = new Vue(vueprops);
    const component = vobj.$mount();
    document.body.appendChild(component.$el);
    vobj.$on('onClose', function() {
      setTimeout(() => {
        if (component.$el.parentNode) {
          component.$el.parentNode.removeChild(component.$el);
        }
        component.$destroy();
      }, 300);
    });
    return vobj;
  }
}

// 千分位显示 钱
export const formartPrice = num => {
  // type分为price/data
  if (num == null || num === undefined || num == '-') {
    return '-';
  }
  const newNum = `${num.toFixed(2)}`.replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g, '$1,');
  return newNum;
};
// 千分位显示 正常数据
export const formartData = (num, digits) => {
  // type分为price/data
  if (num == null || num === undefined || num == '-') {
    return '-';
  }
  let newNum;
  if (digits === 5) {
    newNum = `${num.toFixed(5)}`.replace(/(\d{1,5})(?=(\d{5})+(?:$|\.))/g, '$1,');
  } else {
    newNum = `${num.toFixed(3)}`.replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g, '$1,');
  }
  return newNum;
};

// 以K/M和千分位显示
export const formatterData = (item, type) => {
  // type分为price/data
  if (item == null || item === undefined || item == '-') {
    return '-';
  }
  const dataType = type === 'data' ? formartData : formartPrice;
  let num = item;
  // 1:将number类型转化为string
  if (typeof item === 'number') {
    num = item.toString();
  }
  // 2:判断大于百万简化为k，大于十亿简化为M
  let newNum;
  if (num.split('.')[0].length >= 7 && num.split('.')[0].length < 10) {
    // 简化为K
    newNum = Number(num) / 1000;
    return `${dataType(newNum)}K`;
  }
  if (num.split('.')[0].length >= 10) {
    // 简化为M
    newNum = Number(num) / 1000000000;
    return `${dataType(newNum)}M`;
  }

  return dataType(Number(num)) || '-';
};
export const formatterOption = (data, label, value) => {
  if (!data.length > 0) {
    return [];
  }
  data.map(item => {
    item.label = item[label];
    item.value = item[value];
    return item;
  });
  return data;
};
