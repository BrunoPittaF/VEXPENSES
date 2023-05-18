export interface IFormContact {
  name: string;
  lastname?: string;
  enterprise?: string;
  email?: string;
  telephone: string;
  birthday?: string;
  telephoneDynamic: {
    telephoneD: string;
  }[];
  enterpriseDynamic: {
    enterpriseD: string;
  }[];
}

export interface IFormData extends IFormContact {
  picture?: FileList;
}

export interface IFormServer extends IFormContact {
  picture: string
  id?: number;
}

export interface IContactsData {
  id?: number;
  name: string;
  lastname?: string;
  enterprise?: string;
  telephone: string;
  email?: string;
  birthday?: string;
  picture?: FileList;
  telephoneDynamic: {
    telephoneD: string;
  }[];
  enterpriseDynamic: {
    enterpriseD: string;
  }[];
}