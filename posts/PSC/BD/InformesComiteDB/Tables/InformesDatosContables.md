# Table: InformesDatosContables

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| Id | uniqueidentifier | NO |
| IdSincronizacionSpiga | int | NO |
| Año | int | YES |
| Mes | int | YES |
| Empresa | smallint | NO |
| NombreEmpresa | nvarchar | YES |
| Centro | smallint | YES |
| NombreCentro | nvarchar | YES |
| Seccion | int | YES |
| Departamento | nvarchar | YES |
| CodigoMarca | smallint | YES |
| NombreMarca | nvarchar | YES |
| NombreGama | nvarchar | YES |
| CodigoGama | smallint | YES |
| Cuenta | nvarchar | NO |
| Saldo | decimal | YES |
| FkAsientoGestionEliminacion | nvarchar | YES |
