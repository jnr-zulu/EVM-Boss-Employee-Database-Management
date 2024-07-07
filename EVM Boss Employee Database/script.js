(async function () {
    // Static array of employees for local development
    let employees = [
        { id: 1, firstName: "John", lastName: "Doe", age: 30, address: "123 Main St", email: "john@example.com", contactNumber: "123-456-7890", dob: "1993-01-01", imageUrl: "gfg.png" },
        { id: 2, firstName: "Jane", lastName: "Smith", age: 28, address: "456 Elm St", email: "jane@example.com", contactNumber: "098-765-4321", dob: "1995-05-05", imageUrl: "gfg.png" }
    ];

    let selectedEmployeeId = employees[0]?.id || -1;
    let selectedEmployee = employees[0] || null;

    document.addEventListener('DOMContentLoaded', () => {
        const employeeList = document.querySelector(".employees__names--list");
        const employeeInfo = document.querySelector(".employees__single--info");
        const createEmployee = document.querySelector(".createEmployee");
        const addEmployeeModal = document.querySelector(".addEmployee");
        const addEmployeeForm = document.querySelector(".addEmployee_create");
        const dobInput = document.querySelector(".addEmployee_create--dob");

        // Add Employee - START
        createEmployee.addEventListener("click", () => {
            addEmployeeModal.style.display = "flex";
        });

        addEmployeeModal.addEventListener("click", (e) => {
            if (e.target.className === "addEmployee") {
                addEmployeeModal.style.display = "none";
            }
        });

        // Set Employee age to be entered minimum 18 years
        dobInput.max = `${
            new Date().getFullYear() - 18
        }-${new Date().toISOString().slice(5, 10)}`;

        addEmployeeForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const formData = new FormData(addEmployeeForm);
            const values = [...formData.entries()];
            let empData = {};
            values.forEach((val) => {
                empData[val[0]] = val[1];
            });
            empData.id = employees[employees.length - 1].id + 1;
            empData.age =
                new Date().getFullYear() -
                parseInt(empData.dob.slice(0, 4), 10);
            empData.imageUrl = empData.imageUrl || "gfg.png";
            employees.push(empData);
            renderEmployees();
            addEmployeeForm.reset();
            addEmployeeModal.style.display = "none";
        });
        // Add Employee - END

        // Select Employee Logic - START
        employeeList.addEventListener("click", (e) => {
            if (
                e.target.tagName === "SPAN" &&
                selectedEmployeeId !== e.target.id
            ) {
                selectedEmployeeId = e.target.id;
                renderEmployees();
                renderSingleEmployee();
            }
            // Employee Delete Logic - START
            if (e.target.tagName === "I") {
                employees = employees.filter(
                    (emp) =>
                        String(emp.id) !==
                        e.target.parentNode.id
                );
                if (
                    String(selectedEmployeeId) ===
                    e.target.parentNode.id
                ) {
                    selectedEmployeeId = employees[0]?.id || -1;
                    selectedEmployee = employees[0] || {};
                    renderSingleEmployee();
                }
                renderEmployees();
            }
            // Employee Delete Logic - END
        });
        // Select Employee Logic - END

        // Render All Employees Logic - START
        const renderEmployees = () => {
            employeeList.innerHTML = "";
            employees.forEach((emp) => {
                const employee = document.createElement("span");
                employee.classList.add(
                    "employees__names--item"
                );
                if (
                    parseInt(selectedEmployeeId, 10) === emp.id
                ) {
                    employee.classList.add("selected");
                    selectedEmployee = emp;
                }
                employee.setAttribute("id", emp.id);
                employee.innerHTML = `${emp.firstName} ${emp.lastName}
                    <i class="employeeDelete">&#10060;</i>`;
                employeeList.append(employee);
            });
        };
        // Render All Employees Logic - END

        // Render Single Employee Logic - START
        const renderSingleEmployee = () => {
            if (selectedEmployeeId === -1) {
                employeeInfo.innerHTML = "";
                return;
            }

            employeeInfo.innerHTML = `
            <img src="${selectedEmployee.imageUrl}" />
            <span class="employees__single--heading">
            ${selectedEmployee.firstName} ${selectedEmployee.lastName}
                (${selectedEmployee.age})
            </span>
            <span>${selectedEmployee.address}</span>
            <span>${selectedEmployee.email}</span>
            <span>Mobile - ${selectedEmployee.contactNumber}</span>
            <span>DOB - ${selectedEmployee.dob}</span>
        `;
        };
        // Render Single Employee Logic - END

        renderEmployees();
        if (selectedEmployee) renderSingleEmployee();
    });
})();