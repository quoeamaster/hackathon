import Vue from 'vue'
import Router from 'vue-router'

import TestingVue from '@/components/testing/Testing'
import TemplateContainerVue from '@/components/template/TemplateContainer'
import TemplateHelpVue from '@/components/template/TemplateHelp'
import TemplateInfoView from '@/components/template/TemplateInfoView'
import TemplateBackgroundPickerView from '@/components/template/TemplateBackgroundPickerView'
import TemplateCategoryPreviewView from '@/components/template/TemplateCategoryPreviewView'

Vue.use(Router)

export default new Router({
  // mode => history, hash, abstract
  mode: 'history',
  routes: [
    {
      path: '/template',
      /* name: 'TemplateContainer', */
      component: TemplateContainerVue,
      children: [
        {
          path: '',
          name: 'templatehelp',
          component: TemplateHelpVue
        },
        {
          path: 'info',
          name: 'templateinfoview',
          component: TemplateInfoView
        },
        {
          path: 'backgrdPicker',
          name: 'templatebackgroundpickerview',
          component: TemplateBackgroundPickerView
        },
        {
          path: 'preview',
          name: 'templatecategorypreviewview',
          component: TemplateCategoryPreviewView
        }
      ]
    },
    {
      path: '/',
      name: 'Testing',
      component: TestingVue
    }
  ]
})
