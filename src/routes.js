import SignInForm from "@/components/Signs/SignInForm";
import SignUpForm from "@/components/Signs/SignUpForm";
import AddRestaurant from "@/components/Restaurants/AddRestaurant";
import Home from "@/components/Home";
import RestaurantDetails from "@/components/Restaurants/Details/RestaurantDetails";
export const routes = [
    { path: '', component: Home},
    { path: '/login', component: SignInForm},
    { path: '/signup', component: SignUpForm},
    { path: '/add', component: AddRestaurant},
    { path: '/restaurant/:id', name: 'restaurant', component: RestaurantDetails},
]