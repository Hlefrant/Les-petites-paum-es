import SignInForm from "@/components/Signs/SignInForm";
import SignUpForm from "@/components/Signs/SignUpForm";
import AddRestaurant from "@/components/Restaurants/AddRestaurant";
export const routes = [
    { path: '/login', component: SignInForm},
    { path: '/signup', component: SignUpForm},
    { path: '/add', component: AddRestaurant},
]