# Table: RecibosAnticiposIMP

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkRecibosAnticiposIMP | bigint | NO |
| FkModulos | nvarchar | YES |
| FkIntegracion | smallint | YES |
| FkFicheros | smallint | YES |
| FkProcesos | int | YES |
| FkEmpresas | smallint | YES |
| Tipo | nvarchar | YES |
| NifCifTercero | nvarchar | YES |
| FechaAlta | datetime | YES |
| MonedaCodISO | nvarchar | YES |
| FactorCambio | decimal | YES |
| Importe | decimal | YES |
| Concepto | nvarchar | YES |
| FkPagoFormas | nvarchar | YES |
| CuentaContable | nvarchar | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
