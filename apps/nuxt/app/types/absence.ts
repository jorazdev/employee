
export type TAbsence = {
    abscenceId?: string
    firstName: string
    lastName: string
    personnelNumber?: string
    startDate: string
    endDate: string
}

export type TAbsResult = {
    id: string
    startDate: string
    endDate: string
    reason: string | null
    employee: {
      id: string
      firstName: string
      lastName: string
      personnelNumber: string
    };
}

export type TEmployee = { 
    abscenceId?: string
    firstName: string 
    lastName: string; 
    personnelNumber: string; 
    absences: { 
        begin: string; 
        end: string 
    }[] 
}

export type TRandomUser = {
    results: {
      gender: string;
      name: {
        title: string;
        first: string;
        last: string;
      };
      location: {
        street: {
          number: number;
          name: string;
        };
        city: string;
        state: string;
        country: string;
        postcode: number | string;
        coordinates: {
          latitude: string;
          longitude: string;
        };
        timezone: {
          offset: string;
          description: string;
        };
      };
      email: string;
      login: {
        uuid: string;
        username: string;
        password: string;
        salt: string;
        md5: string;
        sha1: string;
        sha256: string;
      };
      dob: {
        date: string;
        age: number;
      };
      registered: {
        date: string;
        age: number;
      };
      phone: string;
      cell: string;
      id: {
        name: string;
        value: string | null;
      };
      picture: {
        large: string;
        medium: string;
        thumbnail: string;
      };
      nat: string;
    }[];
    info: {
      seed: string;
      results: number;
      page: number;
      version: string;
    };
  };