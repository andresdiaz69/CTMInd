# Table: Alquileres

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkAlquileres_Iden | int | NO |
| FkCentros | smallint | NO |
| Nombre | nvarchar | NO |
| FechaAlta | datetime | NO |
| FechaInicio | datetime | NO |
| FechaFin | datetime | YES |
| FkTerceros | int | NO |
| FkContCtas_base | nvarchar | NO |
| PeriodoFacturacion | tinyint | NO |
| ImportePeriodo | decimal | NO |
| TipoFacturacion | nvarchar | NO |
| FkImpuestos_Iva | nvarchar | YES |
| FkImpuestos_Irpf | nvarchar | YES |
| TextoFactura | nvarchar | NO |
| FechaBaja | datetime | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FkContCtas_Terceros | nvarchar | NO |
| FkContCtas_exenta | nvarchar | YES |
| ImportePeriodoExento | decimal | YES |
| FkCentros_Contable | smallint | YES |
| FkDepartamentos_Contable | nvarchar | YES |
| FkSecciones_Contable | int | YES |
| FechaMod | datetime | NO |
| FkTerceroDirecciones | smallint | NO |
| FkEntidades | nvarchar | YES |
| FkAlquileresSituacionInmuebleSII | tinyint | YES |
| ReferenciaCatastral | nvarchar | YES |
