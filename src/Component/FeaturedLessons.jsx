import { useQuery } from '@tanstack/react-query';
import Loading from './SharedElement/Loading';
import useAxiosSecure from '../Hooks/useAxiosSecure';

const FeaturedLessons = () => {
    const axiosSecure = useAxiosSecure();

    const { data: featuredLessons = [], isLoading } = useQuery({
        queryKey: ['featured-lessons'],
        queryFn: async () => {
            const res = await axiosSecure.get('/lessons/featured');
            return res.data;
        },
    });

    console.log( "featured lesson" ,featuredLessons)

    if (isLoading) return <Loading></Loading>;

    return (
        <div className="my-15 px-10">
            <h2 className="text-2xl md:text-4xl text-primary font-bold text-primary mb-5 text-center">Featured Life Lessons</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {featuredLessons.map((lesson) => (
                    <div key={lesson._id} className="bg-white shadow-md rounded p-5">
                        <h3 className="text-xl font-bold text-primary">{lesson.lessonTitle}</h3>
                        <p>{lesson.description}</p>
                        <p className="mt-2 text-sm font-semibold">Category: {lesson.category}</p>
                        <p className="mt-1 text-sm font-semibold">Tone: {lesson.emotionalTone}</p>
                        <p className="mt-1 text-sm font-semibold">By: {lesson.userName}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FeaturedLessons;
