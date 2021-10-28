import React from 'react';
import { useState,useEffect } from 'react';
import firebase,{ realTimeDB,fireStoreDB} from '../modules/firebase';
import CryptoJS from 'crypto-js';
import MyModule from './MyModule';

const userID = CryptoJS.AES.decrypt(`${window.location.search.replace('?id=', '')}`, `${process.env.REACT_APP_CRYPTOJS_ENCRYPT_KEY}`).toString(CryptoJS.enc.Utf8);

const Courses = () => {
    const [modules, setModules] = useState();
    const [userCourses, setUsersCourses] = useState();
    const [isMyModules, setIsMyModules] = useState(false);

    useEffect(() =>{
        realTimeDB.ref('/modules').on('value', (snapshot) => {
            if (snapshot.exists()) {
                const courses = Object.values(snapshot.val());
                setModules(courses);
            }
        });
        fireStoreDB.collection('users').where("id", "==", `${userID}`)
            .get()
            .then((snapshot) => {
                snapshot.forEach(doc => {
                    setUsersCourses(doc.data().courses);
                    console.log(doc.data());
                })
            })
    }, []);

    const sucribeTocourse = (e) => {
        e.preventDefault();
        console.log(userID);
        fireStoreDB.collection('/users').where("id", "==", `${userID}`)
            .get()
            .then((snapshot) => {
                snapshot.forEach(doc => {
                    console.log(doc.id);
                    const upadate = async () => {
                        const ref = fireStoreDB.collection('/users').doc(`${doc.id}`);
                        if (doc.data().courses && doc.data().courses.indexOf(`${e.target.id}`) === -1) {
                            await ref.set({
                                courses: firebase.firestore.FieldValue.arrayUnion(`${e.target.id}`)
                            }, { merge: true });
                        }
                    }
                    upadate();
                    fireStoreDB.collection('/users').where("id", "==", `${userID}`)
                        .get()
                        .then(newSnapshot => {
                            newSnapshot.forEach(newDoc => {
                                setUsersCourses(newDoc.data().courses);
                            })
                        })
                });
            });
    }

    return (
        <div>
            <div className="flex flex-row mt-10 justify-center">
                <button className='border-2 pl-3 pr-3 pt-1 pb-1 rounded-full animate-wiggle hover:text-pink-900 hover:border-pink-900' onClick={() => {
                    setIsMyModules(false);
                }}>Modules</button>
                <button className='ml-20 border-2 pl-3 pr-3 pt-1 pb-1 rounded-full hover:text-pink-900 hover:border-pink-900' onClick={(e) => {
                    // console.log(e.target)
                    setIsMyModules(true);
                }}>My modules</button>
            </div>
            {
              !isMyModules && modules !== undefined && modules.reverse().map(cours => {
                    return (
                        <div key={cours.id} className='ml-5 mr-5 pb-3 pl-2 rounded-lg mt-5 shadow-xl'>
                            <h3 className='text-lg mt-2'>{cours.module}</h3>
                            <p className='text-xs text-gray-600'>{cours.class}</p>
                            <div className='mt-2'>
                                {userCourses !== undefined && userCourses.indexOf(cours.id) === -1 &&
                                    <button type='button' className='border-2 border-color-red rounded pl-5 pr-5' id={cours.id} onClick={(e) => {
                                        sucribeTocourse(e);
                                    }}>
                                        Suscribe to the module</button>}
                            </div>
                        </div>
                    )
                })
            }
            {
                isMyModules && <MyModule
                subscribedModule={userCourses}
                />
            }
        </div>
    );
}

export default Courses
