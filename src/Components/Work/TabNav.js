import React, { Component } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import IconMeta from './TabsNav/IconMeta';
import IconEdit from "./TabsNav/IconEdit";

// conteudo dos tabs
import TabData from './TabsJS/TabData';
import TabEdit from './TabsJS/TabEdit';
import './TabNav.css'

class TabNav extends Component {
  state = {
    tabIndex: 0
  };

  render() {
    return (
      <div>
        <Tabs className="tabs"
          selectedIndex={this.state.tabIndex}
          onSelect={tabIndex => this.setState({ tabIndex })}
        >
          <TabList className="tab-nav-container">

            <Tab className={` caixa ${this.state.tabIndex === 0 ? 'tab-selected active' : null}`}>
              <div className="p"> <IconMeta />  </div>
              <div className="p">   MetaDados </div>
            </Tab>

            <Tab className={`caixa ${this.state.tabIndex === 1 ? 'tab-selected active' : null}`}>
              <div className="p"> <IconEdit />  </div>
              <div className="p">   Edição </div>
            </Tab>


            <Tab className={`caixa ${this.state.tabIndex === 2 ? 'tab-selected active' : null}`}>
              <Tab />
              <p><strong> Capitulos</strong></p>
            </Tab>

            <Tab className={`caixa ${this.state.tabIndex === 3 ? 'tab-selected active' : null}`}>
              <Tab />
              <p><strong> Documentos </strong> </p>
            </Tab>

            <Tab className={`caixa ${this.state.tabIndex === 4 ? 'active' : null}`}>
              <Tab />
              <p><strong> Branding</strong></p>
            </Tab>

          </TabList>
          <TabPanel>
            <TabData />
          </TabPanel>

          <TabPanel>
            <TabEdit />
          </TabPanel>
        </Tabs>

      </div>
    )
  }

}

export default TabNav;