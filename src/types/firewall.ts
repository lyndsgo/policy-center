export interface FirewallApp {
  id: string;
  name: string;
  firewall: true | false;
}

export interface Firewall {
  firewall: true | false;
  apps: FirewallApp[];
}
