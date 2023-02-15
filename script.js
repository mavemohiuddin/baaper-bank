let loginScreen = document.querySelector("log-in");
let signupScreen = document.querySelector("sign-up");
let loadingScreen = document.querySelector("loading");
let mainScreen = document.querySelector("account");

// =============================== Input field animation ===============================

const set_label = item => {
    item.children[0].classList.add("top-0");
    item.children[0].classList.add("text-xs");
}
const reset_label = item => {
    if (item.children[1].value == "") {
        item.children[0].classList.remove("top-0");
        item.children[0].classList.remove("text-xs");
    }
}
document.querySelectorAll(".input_field").forEach((item) => {
    item.children[1].addEventListener("focus", () => {
        set_label(item);
    })
})
document.querySelectorAll(".input_field").forEach((item) => {
    item.children[1].addEventListener("blur", () => {
        reset_label(item);
    })
})

document.querySelectorAll("[data-role='assist']").forEach((item) => {
    item.addEventListener("click", () => {
        item.classList.add("text-blue-600");
    })
})

document.querySelectorAll("[data-role='submit']").forEach((item) => {
    item.addEventListener("click", () => {
        item.classList.add("bg-blue-500");
    })
})

document.querySelectorAll("[data-object='block']").forEach((item) => {
    item.addEventListener("click", () => {
        if (item.children[1].getAttribute("data-state") == "closed") {
            document.querySelectorAll("[data-object='block']").forEach((item) => {
                item.classList.remove("bg-orange-100");
                item.children[1].classList.remove("mt-4");
                item.classList.remove("py-6");
                if (item.querySelector("input") != null) {
                    item.querySelector("input").value = "";
                }
                item.children[1].setAttribute("data-state", "closed");
                switch_state(item, "add", ["h-0", "w-0", "pb-0", "opacity-0", "pointer-events-none"]);
            })
            item.children[1].setAttribute("data-state", "open");
            item.classList.add("bg-orange-100");
            item.classList.add("py-6");
            item.children[1].classList.add("mt-4");
            switch_state(item, "remove", ["h-0", "w-0", "pb-0", "opacity-0", "pointer-events-none"]);
        } else {
            item.children[1].setAttribute("data-state", "closed");
            item.classList.remove("bg-orange-100");
            item.classList.remove("py-6");
            item.children[1].classList.remove("mt-4");
            switch_state(item, "add", ["h-0", "w-0", "pb-0", "opacity-0", "pointer-events-none"]);
        }
    })
})

document.querySelector("#logout").addEventListener("click", () => {
    mainScreen.classList.add("hidden");
    load("login");
})

const switch_state = (item, state, arr) => {
    if (state == "add") {
        for (i in arr) {
            item.children[1].classList.add(arr[i]);
        }
    } else {
        for (i in arr) {
            item.children[1].classList.remove(arr[i]);
        }
    }
}

document.querySelectorAll("[data-object='interaction']").forEach((item) => {
    item.addEventListener("click", (event)=> {
        event.stopPropagation();
    })
})

// =================================== Money interactions ======================================

document.querySelector("#deposit_submit").addEventListener("click", (event) => {
    let deposit_amount = event.target.parentElement.children[0].value;
    let balance = document.querySelector("#balance");
    let change = document.querySelector("#change_plus");
    let currentUser = document.querySelector("#user").innerHTML;
    change.innerHTML = `+$${deposit_amount}`;
    change.classList.add("opacity-100");
    change.classList.add("translate-y-0");
    setTimeout(() => {
        change.classList.add("hidden");
        change.classList.remove("opacity-100");
        change.classList.remove("translate-y-0");
        balance.innerHTML = parseInt(balance.innerHTML) + parseInt(deposit_amount);
        for (i in user.all_users) {
            if (currentUser == user.all_users[i].username) {
                user.all_users[i].amount = parseInt(balance.innerHTML);
            }
        }
    }, 1000)
    setTimeout(() => {
        change.classList.remove("hidden");
    }, 1100)
    event.target.parentElement.children[0].value = "";
})

document.querySelector("#withdraw_submit").addEventListener("click", (event) => {
    let withdraw_amount = event.target.parentElement.children[0].value;
    let balance = document.querySelector("#balance");
    let change = document.querySelector("#change_minus");
    if (parseInt(balance.innerHTML) >= parseInt(withdraw_amount)) {
        balance.innerHTML = parseInt(balance.innerHTML) - parseInt(withdraw_amount);
        change.innerHTML = `-$${withdraw_amount}`;
        change.classList.remove("hidden");
        setTimeout(() => {
            change.classList.remove("translate-y-0");
            change.classList.add("translate-y-32");
        }, 1)
        setTimeout(() => {
            change.classList.add("translate-y-0");
            change.classList.remove("translate-y-32");
        }, 700)
        setTimeout(() => {
            change.classList.add("hidden");
        }, 850)
        event.target.parentElement.children[0].value = "";
    }
})

// =================================== Swithcing between screens ======================================

loginScreen.querySelector("[ data-type='alt']").addEventListener("click", () => {
    load("signup");
})

signupScreen.querySelector("[ data-type='alt']").addEventListener("click", () => {
    load("login");
})

const load = input => {
    document.querySelectorAll(".error_message").forEach(item => item.innerHTML = "");
    document.querySelectorAll("input").forEach(item => item.value = "");
    document.querySelectorAll(".input_field").forEach((item) => reset_label(item));
    loadingScreen.classList.remove("hidden");
    if (input == "signup") {
        setTimeout(() => {
            loginScreen.classList.add("hidden");
            loadingScreen.classList.add("hidden");
            signupScreen.classList.remove("hidden");
        }, 180)
    } else if (input == "login") {
        setTimeout(() => {
            signupScreen.classList.add("hidden");
            loadingScreen.classList.add("hidden");
            loginScreen.classList.remove("hidden");
        }, 180)
    } else if (input == "main") {
        populate_main();
        setTimeout(() => {
            signupScreen.classList.add("hidden");
            loginScreen.classList.add("hidden");
            loadingScreen.classList.add("hidden");
            mainScreen.classList.remove("hidden");
        }, 360)
    }
}

// ============================================ User Database ===========================================

class user {
    constructor(username, code, amount) {
        this.username = username;
        this.code = code;
        this.amount = amount;
        user.addMe(this);
    }

    static addMe(item) {
        user.all_users.push(item);
    }

    static all_users = [];
}

const admin = new user("admin", "admin", "30000");
const guest = new user("guest", "guest", "100");

// ========================================== Signing up ===========================================

signupScreen.querySelector("[ data-role='submit']").addEventListener("click", () => {
    let newName = signupScreen.querySelector("#signup_id");
    let newPass = signupScreen.querySelector("#signup_pass");
    let errorMessage = signupScreen.querySelector(".error_message");

    if (newName.value.length < 4) {
        newName.parentElement.classList.add("border-red-400");
        errorMessage.innerHTML = "Username must be at least 4 digit";
    } else {
        newName.parentElement.classList.remove("border-red-400");
        if (newPass.value.length < 8) {
            newPass.parentElement.classList.add("border-red-400");
            errorMessage.innerHTML = "Password must contain at least 8 digit, 1 uppercase, and 1 lowercase";
        } else if (newPass.value.toUpperCase() == newPass.value) {
            newPass.parentElement.classList.add("border-red-400");
            errorMessage.innerHTML = "Password must contain at least 8 digit, 1 uppercase, and 1 lowercase";
        } else if (newPass.value.toLowerCase() == newPass.value) {
            newPass.parentElement.classList.add("border-red-400");
            errorMessage.innerHTML = "Password must contain at least 8 digit, 1 uppercase, and 1 lowercase";
        } else {
            newPass.parentElement.classList.remove("border-red-400");
            let newUser = new user(newName.value, newPass.value, "1200");
            load("login");
        }
    }
})

signupScreen.querySelector("[data-role='assist'][data-object='guest']").addEventListener("click", () => {
    let currentUser = document.querySelector("#user");
    currentUser.innerHTML = "guest";
    load("main");
})

// ======================================== Logging in ============================================

loginScreen.querySelector("[ data-role='submit']").addEventListener("click", () => {
    let newName = loginScreen.querySelector("#login_id");
    let newPass = loginScreen.querySelector("#login_pass");
    let errorMessage = loginScreen.querySelector(".error_message");
    let currentUser = document.querySelector("#user");

    for (i in user.all_users) {
        if (newName.value == user.all_users[i].username) {
            if (newPass.value == user.all_users[i].code) {
                currentUser.innerHTML = user.all_users[i].username;
                load("main");
            } else {
                newName.parentElement.classList.remove("border-red-400");
                newPass.parentElement.classList.add("border-red-400");
                errorMessage.innerHTML = "Incorrect Password";
                break;
            }
        } else {
            newName.parentElement.classList.add("border-red-400");
            newPass.parentElement.classList.remove("border-red-400");
            errorMessage.innerHTML = "User Not found"
        }
    }
})

loginScreen.querySelector("[data-object='forgot']").addEventListener("click", () => {
    let newName = loginScreen.querySelector("#login_id");
    let errorMessage = loginScreen.querySelector(".error_message");
    for (i in user.all_users) {
        if (newName.value == user.all_users[i].username) {
            errorMessage.innerHTML = `Hello ${user.all_users[i].username}, Your password is: ${user.all_users[i].code}.`;
            break;
        } else {
            errorMessage.innerHTML = "Please enter a correct username";
        }
    }
})

// =================================== Populating main screen ==================================

const populate_main = () => {
    let currentUser = mainScreen.querySelector("#user");
    let balance = mainScreen.querySelector("#balance");

    for (i in user.all_users) {
        if (currentUser.innerHTML == user.all_users[i].username) {
            console.log(user.all_users[i]);
            balance.innerHTML = user.all_users[i].amount;
        } else {
            console.log(user.all_users[i]);
        }
    }
}