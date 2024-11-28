# Table: DynamicsAnticiposIMP

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkDynamicsAnticiposIMP | bigint | NO |
| FkModulos | nvarchar | YES |
| FkIntegracion | smallint | YES |
| FkFicheros | smallint | YES |
| FkProcesos | int | YES |
| IdEmpresas | smallint | YES |
| NifCifTercero | nvarchar | YES |
| FechaAlta | datetime | YES |
| MonedaCodISO | nvarchar | YES |
| FactorCambio | decimal | YES |
| Importe | decimal | YES |
| Concepto | nvarchar | YES |
| IdPagoFormas | nvarchar | YES |
| CuentaContable | nvarchar | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
