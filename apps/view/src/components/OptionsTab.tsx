import React from 'react';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react"
import PayloadEditor from './EditorPayload'
import ConfigurationEditor from './EditorConfigOptions'


interface DataTabOptionProps {
    label: string,
    component: React.ReactElement
}

interface DataTabComponentProps {
    data: DataTabOptionProps[]
}



export default function OptionsTab() {

    // 1. Create the component
    const DataTabs: React.FC<DataTabComponentProps> = ({ data }) => {
        return (
            <Tabs colorScheme="teal" minW="250px" w="100%" borderRight="1px" borderColor="blackAlpha.50">
                <TabList>
                    {data.map((tab, index) => (
                        <Tab key={[index, tab.label].join('__')}>{tab.label}</Tab>
                    ))}
                </TabList>
                <TabPanels>
                    {data.map((tab, index) => (
                        <TabPanel p={0} m={0} key={[index, tab.label].join('__')}>
                            {tab.component}
                        </TabPanel>
                    ))}
                </TabPanels>
            </Tabs>
        )
    }

    // 2. Create an array of data
    const tabData = [
        {
            label: "Configuration",
            component: <ConfigurationEditor />
        },
        {
            label: "Payload",
            component: <PayloadEditor />
        },
    ]

    // 3. Pass the props and chill!
    return <DataTabs data={tabData} />
}