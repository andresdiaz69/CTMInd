# Table: spiga_ClientesPotenciales

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| IdSincronizacionSpiga | int | NO |
| IdConsecutivo | int | NO |
| Ano_Periodo | int | NO |
| Mes_Periodo | int | NO |
| FechaDeCorte | datetime | NO |
| PkFkEmpresas | smallint | YES |
| PkFkCentros | smallint | YES |
| PkFkTerceros | int | YES |
| NombreTerceroClases | nvarchar | YES |
| Descripcion | nvarchar | YES |
| NifCif | nvarchar | YES |
| PkTerceros | int | YES |
| Nombre | nvarchar | YES |
| Apellido1 | nvarchar | YES |
| Apellido2 | nvarchar | YES |
| Telefonos | nvarchar | YES |
| Emails | nvarchar | YES |
| Direcciones | nvarchar | YES |
| FechaAlta | datetime | YES |
| UsuarioAlta | smallint | YES |
| EmpresaTrabajo | nvarchar | YES |
| Profesion | nvarchar | YES |
| Formacion | nvarchar | YES |
| Cargo | nvarchar | YES |
| FechaNacimiento | datetime | YES |
| EstadoCivil | nvarchar | YES |
| Sexo | nvarchar | YES |
| NumeroHijos | tinyint | YES |
| Aficiones | nvarchar | YES |
