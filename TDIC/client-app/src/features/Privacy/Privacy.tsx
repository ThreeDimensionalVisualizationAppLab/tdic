import { marked } from "marked";
import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import agent from "../../app/api/agent";




export default observer( function Privacy() {

    
  const [policy, setPolicy] = useState<string>("");

    useEffect(() => {
        const DataLoading = async () => {
            const data = await agent.WebsiteSettings.details("PrivacyPolicy");
            setPolicy(data.data);
        };
        DataLoading();
    }, []
    );

    return <div dangerouslySetInnerHTML={{__html: marked(policy)}}></div>;
})