# Table: Fichero347Facturas

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkAñoCalculo | nvarchar | NO |
| PkFkFichero347Periodo | tinyint | NO |
| PkFkFacturaTipos | nvarchar | NO |
| PkFkTerceros | int | NO |
| PkFkSeries | nvarchar | NO |
| PkFkNumFactura | nvarchar | NO |
| FechaFactura | datetime | NO |
| FechaAsiento | datetime | NO |
| Importe | decimal | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| Seleccionada | bit | NO |
| FkAsientoGestionEliminacion | nvarchar | YES |
| PkFichero347Facturas_Iden | tinyint | NO |
