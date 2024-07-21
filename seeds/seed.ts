import { Doctor } from "../src/base/dao/doctor";
import { Patient } from "../src/base/dao/patient";
import { DbConnectionImpl } from "../src/frameworks/database/db-connection-impl";

const seedDatabase = async () => {
  const connection = new DbConnectionImpl();

  const doctorRepository = connection.getConnection().getRepository(Doctor);
  const patientRepository = connection.getConnection().getRepository(Patient);

  const doctors = [
    {
      name: "Dr. João Silva",
      specialty: "Cardiologia",
      rating: 4.5,
      availability: [
        { day: "monday", times: ["08:00", "09:00", "10:00", "11:00"] },
        { day: "tuesday", times: ["13:00", "14:00", "15:00", "16:00"] }
      ]
    },
    {
      name: "Dra. Maria Oliveira",
      specialty: "Dermatologia",
      rating: 4.7,
      availability: [
        { day: "wednesday", times: ["08:00", "09:00", "10:00", "11:00"] },
        { day: "thursday", times: ["13:00", "14:00", "15:00", "16:00"] }
      ]
    }
  ];

  const patients = [
    { name: "Carlos Eduardo", email: "carlos@example.com" },
    { name: "Ana Beatriz", email: "ana@example.com"}
  ];

  await doctorRepository.save(doctors);
  await patientRepository.save(patients);
};

seedDatabase().catch((error) => console.log("Error seeding database: ", error));
