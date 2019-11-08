import { VueConstructor } from "vue";
import _ from "lodash";
import VueRouter, { Route } from 'vue-router';

export interface tag {
  name: string;
  path: string;
  active: Boolean;
}

class Tag {
  active: string = "";
  items: tag[] = [];
  fn: {
    match?: (path: string) => any;
    addRoutes?: Function;
  } = {};
  add(path: string, name: string | undefined) {
    if (!this.exist(path)) {
      let option = this.fn.match(path);
      option.path = path;
      option.name = name || option.name;
      this.fn.addRoutes(option);
      this.items.push(option);
    }
    //激活tag
    this.toActive(path);
  }
  toActive(path: string) {
    this.items.forEach(tag => {
      if (tag.path === path) {
        tag.active = true;
      } else {
        tag.active = false;
      }
    });
  }
  exist(path: string) {
    return this.items.findIndex((tag: tag) => tag.path === path) > -1;
  }
  close(path: string) {
    this.items = this.items.filter((tag: tag) => tag.path !== path);
    //将动态添加的路由删除掉
  }
  closeAll() {
    this.items = [];
    //将动态添加的路由删除掉
  }
}

export let tagVM:Tag = new Tag();

export default function(VueRouter:VueRouter) {
  let { addRoutes, match, replace, push } = VueRouter.prototype;
  tagVM.fn.addRoutes = addRoutes;
  tagVM.fn.match = match
  VueRouter.prototype.push = function(...args: any[]) {
    let firstParams:Route = args[0];
    let path:string;
    let name:string | undefined;
    if (_.isObject(firstParams)) {
      path = firstParams.path;
      name = firstParams.name;
    } else {
      path = firstParams;
      name = args[1];
    }
    tagVM.add(path, name);
    push(...args);
  };
}
