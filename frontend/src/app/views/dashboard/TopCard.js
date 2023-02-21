import React from "react";

const TopCard = ({
  students,
  classrooms,
  subjects,
  teachers,
  classroomSlots,
  courses,
}) => {
  const cardList = [
    {
      icon: "i-Student-Hat-2",
      title: students.length,
      subtitle: "Students",
    },
    {
      icon: "i-Administrator",
      title: teachers.length,
      subtitle: "Teachers",
    },
    {
      icon: "i-Book",
      title: subjects.length,
      subtitle: "Subjects",
    },
    {
      icon: "i-Management",
      title: courses.length,
      subtitle: "Courses",
    },
    {
      icon: "i-University1",
      title: classrooms.length,
      subtitle: "Classrooms",
    },
  ];
  return (
    <div>
      <div className="row">
        {cardList.map((card, index) => (
          <div key={index} className="col-lg-2 col-md-6 col-sm-6">
            <div className="card card-icon-bg card-icon-bg-primary o-hidden mb-4">
              <div className="card-body text-center">
                <i className={card.icon}></i>
                <div className="content">
                  <p className="text-muted mt-2 mb-0 text-capitalize">
                    {card.subtitle}
                  </p>
                  <p className="lead text-primary text-24 mb-2 text-capitalize">
                    {card.title}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopCard;
