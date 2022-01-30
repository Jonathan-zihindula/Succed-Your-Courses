import React, { useEffect,useState } from 'react';
import { useSelector } from 'react-redux';
import { realTimeDB } from '../../services/firebase';
import '../../../assets/css/enrolledCourse.css';
import { Link } from 'react-router-dom';
import { LocalStorage } from '../../helper/localStorage';

const EnrolledCourses = ({flexDirection,marginTop}) => {
    //////////////// GET THE USER'S DATA FROM REDUX //////////
    // const user = JSON.parse(LocalStorage.get('userData'));

    // const history = useHistory();

    /////////////// GET THE DISPATCHED ENROLLED COURSES TO ADD ID IN "EnrollCourses" COMPONENT//////
    const newEnrolledCourse = useSelector((state) => state.enroll);
    console.log(newEnrolledCourse);

    //////////////// ALL COURSES STORED IN THIS USESTATE///////
    const [allcourse, setAllcourse] = useState();
    const [user, setUser] = useState(JSON.parse(LocalStorage.get('userData')) || null);
    // const user = useRef(null)

    /////////////// CONSOLE DEBUG//////////////
    // console.log('courses', allcourse);

    //////////////// FETCH ALL COURSE FROM FIREBASE ////////////
    useEffect(() => {
        realTimeDB.ref('/modules').on('value', (snapshot) => {
            const courses = Object.values(snapshot.val());
                setAllcourse(courses);
        })
    }, []);

    useEffect(() => {
        // window.addEventListener('storage', () => {
            const user = JSON.parse(LocalStorage.get('userData'));
            console.log('useEffect user', user);
        setUser(user);
        // user.current = user;
        // })
    },[]);
    
    return (
        <div>
            <div>
                <p className='font-Poppins ml-5 mt-0 mb-5'>Enrolled courses</p>
            </div>
            <div className='ml-5 mr-5'>
                <ul className={`enrolledCourse-container w-full flex ${flexDirection} rounded-lg`}>
                    {
                        user !== null && user.courses !== undefined && user.courses !== 0 && user.courses.map(courseID => {
                            return (
                                <>
                                    {
                                        allcourse !== undefined && allcourse.map(course => {
                                            return (
                                                courseID === course.id && <li style={{
                                                    backgroundImage: `url(${course.cover})`,
                                                    backgroundOrigin: 'content-box',
                                                    backgroundRepeat: 'no-repeat',
                                                    backgroundPosition: 'center',
                                                    backgroundSize: 'auto',
                                                }}
                                                    className={`h-52 w-screen enrolled-course pl-5 pt-5 pr-5 ${marginTop}`}
                                                    key={course.id}
                                                >
                                                    <div className='w-screen'>
                                                        <p className='text-white font-Poppins'>{course.module}</p>
                                                        <p className='text-white font-Mulish'>{course.class}</p>
                                                        <Link to={`module-content/${courseID}`}><button
                                                            className='mt-5 border-2 border-white rounded-full text-white font-Mulish pt-1 pl-2 pr-2 pb-1 text-sm'
                                                        >Open now</button></Link>
                                                    </div>
                                                </li>
                                            )
                                            // }
                                        })
                                    }
                                </>
                            )
                        })
                    }
                </ul>
            </div>
        </div>
    );
}

export default EnrolledCourses