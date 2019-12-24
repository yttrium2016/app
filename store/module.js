import _assign from 'lodash/assign'
import _omit from 'lodash/omit'
class MakeModule {
  constructor(options) {
    // 最后的返回的
    this.module = {
      namespaced : true,
      state: {},
      getters: {},
      mutations: {},
      actions: {}
    }
    options.state = _assign({}, _omit(options, ['state', 'getters', 'mutations', 'actions','namespaced']), options.state)
    this._modulesBuilder(options)
  }

  _modulesBuilder({ state = {}, getters = {}, mutations = {}, actions = {} ,namespaced = true}) {
    Object.keys(state).map(k => {
      this._modulesSingleBuilder({
        k,
        v: state[k]
      })
    })
    this.module.getters = _assign({}, this.module.getters, getters)
    this.module.mutations = _assign({}, this.module.mutations, mutations)
    this.module.actions = _assign({}, this.module.actions, actions)
    this.module.namespaced = namespaced
  }
  _modulesSingleBuilder({ k, v = null }) {
    let label = str2label(k)
    this.module.state[k] = v
    this.module.getters[k] = state => state[k]
    this.module.mutations[`SET_${label}`] = (state, vaule) => {
      state[k] = vaule
    }
    this.module.actions[`set${k.charAt(0).toUpperCase()}${k.substr(1)}`] = ({ commit }, value) => {
      commit(`SET_${label}`, value)
    }
  }
}
/**
 * 改变字符串为标签样式 userInfo => USER_INFO
 * @param name
 * @returns {string}
 */
function str2label(name) {
  let result = ''
  //首字母小写执行标签化
  if (!name.charAt(0).match(/[A-Z]+/)) {
    //根据大写字母进行分组
    let names = name.split(/[A-Z]+/)
    //循环数组
    for (var index = 0; index < names.length; index++) {
      let item = names[index]
      //判断index>0时进行添加字母处理
      if (index > 0) {
        //分组时干掉的字母位置
        var strlength = 0
        //循环获得字母位置
        for (var i = index; i > 0; i--) {
          strlength += names[i - 1].length
        }
        //从源字符串中截取字母
        var str = name.substring(strlength, strlength + 1)
        //将字母添加到相应位置
        names[index] = str + item
        //组合成相应标签格式
        result += '_' + names[index].toUpperCase()
      } else {
        //数组第一个不用加下划线
        result = names[index].toUpperCase()
      }
    }
  } else {
    result = name.toUpperCase()
  }
  return result
}

export default data => new MakeModule(data)['module']
