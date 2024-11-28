# Table: CajasAnticiposProveedorDet

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkFkCajas | smallint | NO |
| PkFkCajasDet | int | NO |
| PkCajasAnticiposProveedorDet_Iden | tinyint | NO |
| FkAnticiposProveedor | int | NO |
| FkAnticiposProveedorAsientos | tinyint | NO |
| FkPagoFormas | nvarchar | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FkContCtas_Contabilizacion | nvarchar | YES |
| FkCajasAnuladosDet_Parcial | int | YES |
