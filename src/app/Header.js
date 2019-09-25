import React from 'react';
import {Tab} from 'evergreen-ui';
import queries from "../query";
const { getHospitalList } = queries;

const Header = () => {
    return (
        <Tab onSelect={async () => {
            const query = await getHospitalList();
            console.log(query);
        }}>Home</Tab>
    )
}

export default Header;
