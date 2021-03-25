import React, {useState, useEffect} from 'react';
import {fetchLists} from '../services/api'

function HomePage(props) {

    const [lists, setLists] = useState("")


    useEffect(() => {
        (async () => {
            let tempList = await fetchLists();
            setLists(tempList)
        })()
    }, [])

    let separatedLists = Object.values(lists)
    let list1 = [];
    let list2 = [];
    let list3 = [];

    separatedLists.map(list => {
        if (list.id === 1) {
            list1.push(list)
            list1.push(list.tasks)
        } else if (list.id === 2) {
            list2.push(list)
            list2.push(list.tasks)
        }
        else {
            list3.push(list)
            list3.push(list.tasks)
        }
    })



    console.log('list 1', list1)
    console.log('list 2', list2)
    console.log('list 3', list3)

    let list1_Tasks = list1[1]
    let list2_Tasks = list2[1]
    let list3_Tasks = list3[1]

    let commentObj = {}

    if (!list1_Tasks) return null;

    list1_Tasks.map(task => {
        commentObj[task.id] = task.comments
    })
    list2_Tasks.map(task => {
        commentObj[task.id] = task.comments
    })
    list3_Tasks.map(task => {
        commentObj[task.id] = task.comments
    })
    console.log(commentObj)



    // console.log('comment 1', comment1)

    let task1_Comments = []
    for (const property in commentObj) {

    }


    return (
        <div>
            <ol> {list1[0].name}
                {list1_Tasks.map(task => {
                    return (

                        <>
                        <li>{task.name}</li>
                        {/* <li>{commentObj[task.name]}</li> */}
                        </>
                    )
                })}
            </ol>
            <ol> {list2[0].name}
                {list2_Tasks.map(task => <li>{task.name}</li>)}
            </ol>
            <ol> {list1[0].name}
                {list3_Tasks.map(task => <li>{task.name}</li>)}
            </ol>

        </div>
    );
}

export default HomePage;
