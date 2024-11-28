# Table: OfertasTercerosReparto

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkFkTerceros | int | NO |
| PkFkClientesPotEntradas | smallint | NO |
| PkFkOfertas | smallint | NO |
| PkFkTerceros_Oferta | int | NO |
| PkFkFacturaTipos | nvarchar | NO |
| EsFinanciera | bit | NO |
| PorcentajeReparto | decimal | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FkTerceroDirecciones | smallint | YES |
