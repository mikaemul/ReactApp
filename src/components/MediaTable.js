import React from "react";
import MediaRow from './MediaRow';
import { useAllMedia } from "../hooks/ApiHooks";
import { GridList, GridListTile, ListSubheader, makeStyles,useMediaQuery} from '@material-ui/core';

const useStyles = makeStyles((theme)=> ({
    root:{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        width: '100%',
        height: '100%',
    },
    icon:{
        color:'rgba(255,255,255,0.54)',
    },
}));


const MediaTable = () =>{
    const classes = useStyles();
    const matches = useMediaQuery('(min-width:697px)')
    const picArray = useAllMedia();
    console.log(picArray);
    const mediaRow = picArray.map((file)=>
        <GridListTile key={file.file_id}>
            <MediaRow file={file}/>
        </GridListTile>)

    /*const mediaRow = picArray.map((item,index) => {
        return <MediaRow file={item} key={index}/>
        
    });
    */
    return (
    <div className={classes.root}>
        <GridList
            cellHeight={180}
            className={classes.gridList}
            cols={matches ? 3 : 2}>
                <GridListTile key="Subheader" cols={3} style={{height: 'auto'}}>
                    <ListSubheader component="div">All media</ListSubheader>
                </GridListTile>
                {mediaRow}
       </GridList> 
    </div>
    );
}


export default MediaTable;