// Mock data simulating MongoDB backend response
// You will replace this with actual API calls to your MongoDB backend

export interface Degree {
  type: "Bachelor" | "Master" | "Doctorate";
  school: string;
  major: string;
  year: number;
  isGraduated: boolean;
}

export interface TeacherFromBackend {
  id: string;
  code: string;
  fullName: string;
  email: string | null;
  phone: string | null;
  avatarUrl: string | null;
  address: string | null;
  dateOfBirth: string | null;
  idNumber: string | null;
  status: "active" | "inactive";
  startDate: string;
  positionIds: string[];
  degrees: Degree[];
  createdAt: string;
  updatedAt: string;
}

export interface WorkPositionFromBackend {
  id: string;
  code: string;
  name: string;
  description: string | null;
  status: "active" | "inactive";
}

// Mock work positions
export const mockWorkPositions: WorkPositionFromBackend[] = [
  { id: "670b306f6dce2acd384c6c77", code: "GV", name: "Giáo viên", description: "Giáo viên giảng dạy", status: "active" },
  { id: "670b307b6dce2acd384c6c79", code: "GVCN", name: "Giáo viên chủ nhiệm", description: "Giáo viên chủ nhiệm lớp", status: "active" },
  { id: "670b2f9a6dce2acd384c6c65", code: "TBM", name: "Trưởng bộ môn", description: "Trưởng bộ môn", status: "active" },
  { id: "670b30586dce2acd384c6c75", code: "HP", name: "Hiệu phó", description: "Hiệu phó nhà trường", status: "active" },
  { id: "670f3fda688dec7f661d70c7", code: "HT", name: "Hiệu trưởng", description: "Hiệu trưởng nhà trường", status: "active" },
];

// Mock teachers data based on MongoDB structure
export const mockTeachers: TeacherFromBackend[] = [
  {
    id: "670df3b6ccc16cc87ce2b872",
    code: "0415678462",
    fullName: "Nguyễn Văn An",
    email: "nguyenvanan@edu.vn",
    phone: "0912345678",
    avatarUrl: null,
    address: "123 Đường Láng, Đống Đa, Hà Nội",
    dateOfBirth: "1975-05-15",
    idNumber: "001075123456",
    status: "active",
    startDate: "2024-10-15T04:46:36.803Z",
    positionIds: ["670b306f6dce2acd384c6c77"],
    degrees: [
      { type: "Doctorate", school: "Đại học Sư Phạm Hà Nội", major: "Công Nghệ Thông Tin", year: 2001, isGraduated: true }
    ],
    createdAt: "2024-10-15T04:46:46.351Z",
    updatedAt: "2024-10-15T04:46:46.351Z"
  },
  {
    id: "670e49519b361ae928a5c6f0",
    code: "1096169283",
    fullName: "Trần Thị Bình",
    email: "tranthibinh@edu.vn",
    phone: "0923456789",
    avatarUrl: null,
    address: "45 Phố Huế, Hai Bà Trưng, Hà Nội",
    dateOfBirth: "1980-08-20",
    idNumber: "001080234567",
    status: "active",
    startDate: "2024-10-15T10:50:08.813Z",
    positionIds: ["670b307b6dce2acd384c6c79", "670b2f9a6dce2acd384c6c65"],
    degrees: [
      { type: "Bachelor", school: "Đại học Công Nghiệp Hà Nội", major: "Quản trị nhân lực", year: 2001, isGraduated: true }
    ],
    createdAt: "2024-10-15T10:52:01.414Z",
    updatedAt: "2024-10-15T10:52:01.414Z"
  },
  {
    id: "670e4b9d9b361ae928a5c732",
    code: "1096169083",
    fullName: "Lê Văn Cường",
    email: "levancuong@edu.vn",
    phone: "0934567890",
    avatarUrl: null,
    address: "78 Nguyễn Trãi, Thanh Xuân, Hà Nội",
    dateOfBirth: "1982-03-10",
    idNumber: "001082345678",
    status: "active",
    startDate: "2024-10-15T10:50:08.813Z",
    positionIds: ["670b2f9a6dce2acd384c6c65", "670b30586dce2acd384c6c75"],
    degrees: [
      { type: "Bachelor", school: "Đại học Sư Phạm Hà Nội", major: "Sư phạm Toán", year: 2005, isGraduated: true }
    ],
    createdAt: "2024-10-15T11:01:49.851Z",
    updatedAt: "2024-10-15T11:01:49.851Z"
  },
  {
    id: "670f2f936d7976234bcdf3fd",
    code: "1208101718",
    fullName: "Phạm Thị Dung",
    email: "phamthidung@edu.vn",
    phone: "0945678901",
    avatarUrl: null,
    address: "90 Trần Duy Hưng, Cầu Giấy, Hà Nội",
    dateOfBirth: "1985-11-25",
    idNumber: "001085456789",
    status: "active",
    startDate: "2024-10-16T03:11:54.293Z",
    positionIds: ["670b2f9a6dce2acd384c6c65"],
    degrees: [
      { type: "Bachelor", school: "Đại Học", major: "Ngôn Ngữ", year: 2010, isGraduated: true }
    ],
    createdAt: "2024-10-16T03:14:27.252Z",
    updatedAt: "2024-10-16T03:14:27.252Z"
  },
  {
    id: "670f30e46d7976234bcdf40f",
    code: "1988101718",
    fullName: "Hoàng Văn Em",
    email: "hoangvanem@edu.vn",
    phone: "0956789012",
    avatarUrl: null,
    address: "12 Lê Đức Thọ, Nam Từ Liêm, Hà Nội",
    dateOfBirth: "1978-07-08",
    idNumber: "001078567890",
    status: "active",
    startDate: "2024-10-16T03:11:54.293Z",
    positionIds: ["670b2f9a6dce2acd384c6c65"],
    degrees: [
      { type: "Bachelor", school: "Đại Học Kinh Tế Quốc Dân", major: "Quản Trị Kinh Doanh", year: 2011, isGraduated: true }
    ],
    createdAt: "2024-10-16T03:20:04.302Z",
    updatedAt: "2024-10-16T03:20:04.302Z"
  },
  {
    id: "670f30f56d7976234bcdf41d",
    code: "1288105718",
    fullName: "Vũ Thị Phương",
    email: "vuthiphuong@edu.vn",
    phone: "0967890123",
    avatarUrl: null,
    address: "34 Hoàng Quốc Việt, Cầu Giấy, Hà Nội",
    dateOfBirth: "1983-09-12",
    idNumber: "001083678901",
    status: "active",
    startDate: "2024-10-16T03:11:54.293Z",
    positionIds: ["670b2f9a6dce2acd384c6c65"],
    degrees: [
      { type: "Master", school: "Đại Học Ngoại Thương", major: "Kinh Tế Đối Ngoại", year: 2012, isGraduated: true }
    ],
    createdAt: "2024-10-16T03:20:21.766Z",
    updatedAt: "2024-10-16T03:20:21.766Z"
  },
  {
    id: "670f311c6d7976234bcdf42c",
    code: "1285101718",
    fullName: "Đặng Văn Giang",
    email: "dangvangiang@edu.vn",
    phone: "0978901234",
    avatarUrl: null,
    address: "56 Xuân Thủy, Cầu Giấy, Hà Nội",
    dateOfBirth: "1986-01-30",
    idNumber: "001086789012",
    status: "active",
    startDate: "2024-10-16T03:11:54.293Z",
    positionIds: ["670b2f9a6dce2acd384c6c65"],
    degrees: [
      { type: "Bachelor", school: "Đại Học Bách Khoa", major: "Công Nghệ Thông Tin", year: 2009, isGraduated: true }
    ],
    createdAt: "2024-10-16T03:21:00.278Z",
    updatedAt: "2024-10-16T03:21:00.278Z"
  },
  {
    id: "670f31296d7976234bcdf436",
    code: "1288141718",
    fullName: "Bùi Thị Hạnh",
    email: "buithihanh@edu.vn",
    phone: "0989012345",
    avatarUrl: null,
    address: "78 Nguyễn Khánh Toàn, Cầu Giấy, Hà Nội",
    dateOfBirth: "1990-04-18",
    idNumber: "001090890123",
    status: "active",
    startDate: "2024-10-16T03:11:54.293Z",
    positionIds: ["670b2f9a6dce2acd384c6c65"],
    degrees: [
      { type: "Bachelor", school: "Đại Học Cần Thơ", major: "Nông Nghiệp", year: 2014, isGraduated: true }
    ],
    createdAt: "2024-10-16T03:21:13.569Z",
    updatedAt: "2024-10-16T03:21:13.569Z"
  },
  {
    id: "670f313d6d7976234bcdf440",
    code: "1288102718",
    fullName: "Ngô Văn Hùng",
    email: "ngovanhung@edu.vn",
    phone: "0990123456",
    avatarUrl: null,
    address: "23 Trần Quốc Hoàn, Cầu Giấy, Hà Nội",
    dateOfBirth: "1981-12-05",
    idNumber: "001081901234",
    status: "active",
    startDate: "2024-10-16T03:11:54.293Z",
    positionIds: ["670b2f9a6dce2acd384c6c65"],
    degrees: [
      { type: "Master", school: "Đại Học Hải Phòng", major: "Hải Dương Học", year: 2015, isGraduated: true }
    ],
    createdAt: "2024-10-16T03:21:33.165Z",
    updatedAt: "2024-10-16T03:21:33.165Z"
  },
  {
    id: "670f314a6d7976234bcdf44a",
    code: "1248101718",
    fullName: "Trịnh Thị Kim",
    email: "trinhthikim@edu.vn",
    phone: "0901234567",
    avatarUrl: null,
    address: "45 Phạm Văn Đồng, Bắc Từ Liêm, Hà Nội",
    dateOfBirth: "1988-06-22",
    idNumber: "001088012345",
    status: "inactive",
    startDate: "2024-10-16T03:11:54.293Z",
    positionIds: ["670b2f9a6dce2acd384c6c65"],
    degrees: [
      { type: "Bachelor", school: "Đại Học Mỏ Địa Chất", major: "Địa Chất", year: 2013, isGraduated: true }
    ],
    createdAt: "2024-10-16T03:21:46.206Z",
    updatedAt: "2024-10-16T03:21:46.206Z"
  },
  {
    id: "670f31556d7976234bcdf454",
    code: "1288101728",
    fullName: "Lý Văn Lâm",
    email: "lyvanlam@edu.vn",
    phone: "0912345670",
    avatarUrl: null,
    address: "67 Cầu Diễn, Nam Từ Liêm, Hà Nội",
    dateOfBirth: "1979-02-14",
    idNumber: "001079123456",
    status: "active",
    startDate: "2024-10-16T03:11:54.293Z",
    positionIds: ["670b2f9a6dce2acd384c6c65"],
    degrees: [
      { type: "Master", school: "Đại Học Sư Phạm", major: "Sư Phạm Ngữ Văn", year: 2008, isGraduated: true }
    ],
    createdAt: "2024-10-16T03:21:57.291Z",
    updatedAt: "2024-10-16T03:21:57.291Z"
  },
  {
    id: "670f315e6d7976234bcdf45e",
    code: "1238601718",
    fullName: "Mai Thị Ngọc",
    email: "maithingoc@edu.vn",
    phone: "0923456780",
    avatarUrl: null,
    address: "89 Mỹ Đình, Nam Từ Liêm, Hà Nội",
    dateOfBirth: "1987-10-03",
    idNumber: "001087234567",
    status: "active",
    startDate: "2024-10-16T03:11:54.293Z",
    positionIds: ["670b2f9a6dce2acd384c6c65"],
    degrees: [
      { type: "Bachelor", school: "Đại Học Khoa Học Tự Nhiên", major: "Sinh Học", year: 2011, isGraduated: true }
    ],
    createdAt: "2024-10-16T03:22:06.100Z",
    updatedAt: "2024-10-16T03:22:06.100Z"
  },
  {
    id: "670f31656d7976234bcdf468",
    code: "1288411718",
    fullName: "Đinh Văn Oanh",
    email: "dinhvanoanh@edu.vn",
    phone: "0934567891",
    avatarUrl: null,
    address: "12 Hồ Tùng Mậu, Cầu Giấy, Hà Nội",
    dateOfBirth: "1984-08-27",
    idNumber: "001084345678",
    status: "active",
    startDate: "2024-10-16T03:11:54.293Z",
    positionIds: ["670b2f9a6dce2acd384c6c65"],
    degrees: [
      { type: "Bachelor", school: "Đại Học Y Hà Nội", major: "Y Khoa", year: 2012, isGraduated: true }
    ],
    createdAt: "2024-10-16T03:22:13.632Z",
    updatedAt: "2024-10-16T03:22:13.632Z"
  },
  {
    id: "670f316f6d7976234bcdf472",
    code: "1952101718",
    fullName: "Phan Thị Quỳnh",
    email: "phanthiquynh@edu.vn",
    phone: "0945678902",
    avatarUrl: null,
    address: "34 Nguyễn Phong Sắc, Cầu Giấy, Hà Nội",
    dateOfBirth: "1989-05-16",
    idNumber: "001089456789",
    status: "active",
    startDate: "2024-10-16T03:11:54.293Z",
    positionIds: ["670b2f9a6dce2acd384c6c65"],
    degrees: [
      { type: "Bachelor", school: "Đại Học Nông Lâm", major: "Khoa Học Cây Trồng", year: 2010, isGraduated: true }
    ],
    createdAt: "2024-10-16T03:22:23.864Z",
    updatedAt: "2024-10-16T03:22:23.864Z"
  },
  {
    id: "670f3701688dec7f661d6f21",
    code: "0399962044",
    fullName: "Trương Văn Sơn",
    email: "truongvanson@edu.vn",
    phone: "0956789013",
    avatarUrl: null,
    address: "56 Đường Bưởi, Tây Hồ, Hà Nội",
    dateOfBirth: "1982-11-09",
    idNumber: "001082567890",
    status: "active",
    startDate: "2024-10-16T03:31:40.953Z",
    positionIds: ["670b2f9a6dce2acd384c6c65"],
    degrees: [
      { type: "Master", school: "Đại Học Đà Lạt", major: "Du Lịch", year: 2014, isGraduated: true }
    ],
    createdAt: "2024-10-16T03:46:09.355Z",
    updatedAt: "2024-10-16T03:46:09.355Z"
  },
  {
    id: "670f372a688dec7f661d6f47",
    code: "3664683813",
    fullName: "Hồ Thị Tuyết",
    email: "hothituyet@edu.vn",
    phone: "0967890124",
    avatarUrl: null,
    address: "78 Lạc Long Quân, Tây Hồ, Hà Nội",
    dateOfBirth: "1991-03-21",
    idNumber: "001091678901",
    status: "active",
    startDate: "2024-10-16T03:31:40.953Z",
    positionIds: ["670b2f9a6dce2acd384c6c65"],
    degrees: [
      { type: "Bachelor", school: "Đại Học Thủ Dầu Một", major: "Công Nghệ Thông Tin", year: 2013, isGraduated: true }
    ],
    createdAt: "2024-10-16T03:46:50.284Z",
    updatedAt: "2024-10-16T03:46:50.284Z"
  },
  {
    id: "670f3e7e688dec7f661d6fa1",
    code: "1864716387",
    fullName: "Cao Văn Uy",
    email: "caovanuy@edu.vn",
    phone: "0978901235",
    avatarUrl: null,
    address: "90 Âu Cơ, Tây Hồ, Hà Nội",
    dateOfBirth: "1980-07-04",
    idNumber: "001080789012",
    status: "active",
    startDate: "2024-10-16T03:31:40.953Z",
    positionIds: ["670b2f9a6dce2acd384c6c65"],
    degrees: [
      { type: "Master", school: "Đại Học Nông Lâm", major: "Khoa Học Môi Trường", year: 2010, isGraduated: true }
    ],
    createdAt: "2024-10-16T04:18:06.837Z",
    updatedAt: "2024-10-16T04:18:06.837Z"
  },
  {
    id: "670f3e8b688dec7f661d6fab",
    code: "4215858843",
    fullName: "Dương Thị Vân",
    email: "duongthivan@edu.vn",
    phone: "0989012346",
    avatarUrl: null,
    address: "23 Thụy Khuê, Tây Hồ, Hà Nội",
    dateOfBirth: "1992-09-28",
    idNumber: "001092890123",
    status: "active",
    startDate: "2024-10-16T03:31:40.953Z",
    positionIds: ["670b2f9a6dce2acd384c6c65"],
    degrees: [
      { type: "Bachelor", school: "Đại Học Sư Phạm Hà Nội", major: "Toán Học", year: 2015, isGraduated: true }
    ],
    createdAt: "2024-10-16T04:18:19.228Z",
    updatedAt: "2024-10-16T04:18:19.228Z"
  },
  {
    id: "670f3e93688dec7f661d6fb5",
    code: "3781215661",
    fullName: "Lương Văn Xuân",
    email: "luongvanxuan@edu.vn",
    phone: "0990123457",
    avatarUrl: null,
    address: "45 Yên Phụ, Tây Hồ, Hà Nội",
    dateOfBirth: "1983-12-15",
    idNumber: "001083901234",
    status: "active",
    startDate: "2024-10-16T03:31:40.953Z",
    positionIds: ["670b2f9a6dce2acd384c6c65"],
    degrees: [
      { type: "Master", school: "Đại Học Kinh Tế Quốc Dân", major: "Kế Toán", year: 2012, isGraduated: true }
    ],
    createdAt: "2024-10-16T04:18:27.841Z",
    updatedAt: "2024-10-16T04:18:27.841Z"
  },
  {
    id: "670f3eae688dec7f661d6fc9",
    code: "2621511601",
    fullName: "Tạ Thị Yến",
    email: "tathiyen@edu.vn",
    phone: "0901234568",
    avatarUrl: null,
    address: "67 Văn Cao, Ba Đình, Hà Nội",
    dateOfBirth: "1986-04-07",
    idNumber: "001086012345",
    status: "inactive",
    startDate: "2024-10-16T03:31:40.953Z",
    positionIds: ["670b2f9a6dce2acd384c6c65"],
    degrees: [
      { type: "Bachelor", school: "Đại Học Y Hà Nội", major: "Y Học Cổ Truyền", year: 2011, isGraduated: true }
    ],
    createdAt: "2024-10-16T04:18:54.769Z",
    updatedAt: "2024-10-16T04:18:54.769Z"
  },
  {
    id: "670f3ebb688dec7f661d6fd3",
    code: "2246882558",
    fullName: "Chu Văn Anh",
    email: "chuvananh@edu.vn",
    phone: "0912345679",
    avatarUrl: null,
    address: "89 Kim Mã, Ba Đình, Hà Nội",
    dateOfBirth: "1990-08-19",
    idNumber: "001090123456",
    status: "active",
    startDate: "2024-10-16T03:31:40.953Z",
    positionIds: ["670b2f9a6dce2acd384c6c65"],
    degrees: [
      { type: "Bachelor", school: "Đại Học Ngoại Ngữ Đà Nẵng", major: "Tiếng Anh", year: 2013, isGraduated: true }
    ],
    createdAt: "2024-10-16T04:19:07.178Z",
    updatedAt: "2024-10-16T04:19:07.178Z"
  },
  {
    id: "670f3ec4688dec7f661d6fdd",
    code: "1031019996",
    fullName: "Kiều Thị Bích",
    email: "kieuthibich@edu.vn",
    phone: "0923456781",
    avatarUrl: null,
    address: "12 Liễu Giai, Ba Đình, Hà Nội",
    dateOfBirth: "1988-01-23",
    idNumber: "001088234567",
    status: "active",
    startDate: "2024-10-16T03:31:40.953Z",
    positionIds: ["670b2f9a6dce2acd384c6c65"],
    degrees: [
      { type: "Bachelor", school: "Đại Học Xây Dựng", major: "Kỹ Thuật Xây Dựng", year: 2014, isGraduated: true }
    ],
    createdAt: "2024-10-16T04:19:16.817Z",
    updatedAt: "2024-10-16T04:19:16.817Z"
  },
  {
    id: "670f4039688dec7f661d70df",
    code: "0798333082",
    fullName: "Đoàn Văn Cảnh",
    email: "doanvancanh@edu.vn",
    phone: "0934567892",
    avatarUrl: null,
    address: "34 Đội Cấn, Ba Đình, Hà Nội",
    dateOfBirth: "1977-06-11",
    idNumber: "001077345678",
    status: "active",
    startDate: "2024-10-16T03:31:40.953Z",
    positionIds: ["670f3fda688dec7f661d70c7"],
    degrees: [
      { type: "Master", school: "Đại Học Y Hà Nội", major: "Y Đa Khoa", year: 2009, isGraduated: true }
    ],
    createdAt: "2024-10-16T04:25:29.561Z",
    updatedAt: "2024-10-16T04:25:29.561Z"
  }
];

// Simulated API service - Replace these functions with actual API calls
export const teacherService = {
  // Get all teachers with pagination
  async getTeachers(page: number = 1, pageSize: number = 10, search?: string) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    let filteredTeachers = [...mockTeachers];
    
    if (search) {
      const searchLower = search.toLowerCase();
      filteredTeachers = filteredTeachers.filter(t => 
        t.fullName.toLowerCase().includes(searchLower) ||
        t.code.includes(search) ||
        t.email?.toLowerCase().includes(searchLower)
      );
    }
    
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const paginatedTeachers = filteredTeachers.slice(start, end);
    
    return {
      data: paginatedTeachers,
      total: filteredTeachers.length,
      page,
      pageSize
    };
  },
  
  // Get single teacher by ID
  async getTeacherById(id: string) {
    await new Promise(resolve => setTimeout(resolve, 200));
    return mockTeachers.find(t => t.id === id) || null;
  },
  
  // Get work positions
  async getWorkPositions() {
    await new Promise(resolve => setTimeout(resolve, 200));
    return mockWorkPositions;
  },
  
  // Get positions for a teacher
  getTeacherPositions(positionIds: string[]) {
    return mockWorkPositions.filter(p => positionIds.includes(p.id));
  }
};

// Helper to format degree for display
export const formatDegree = (degree: Degree): string => {
  const typeMap: Record<string, string> = {
    Bachelor: "Cử nhân",
    Master: "Thạc sĩ",
    Doctorate: "Tiến sĩ"
  };
  return `${typeMap[degree.type] || degree.type} - ${degree.school} - ${degree.major} (${degree.year})`;
};
