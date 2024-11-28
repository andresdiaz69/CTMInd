# Table: OfertasFinanciacionPrestamos

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PKFKAñoOfertasFinanciacion | nvarchar | NO |
| PkFKSeries_OfertasFinanciacion | nvarchar | NO |
| PkFKNumOfertasFinanciacion | int | NO |
| PKOfertasFinanciacionPrestamos_Iden | smallint | NO |
| Entidad | nvarchar | YES |
| Valor | decimal | YES |
| CuotaMensual | decimal | YES |
| FechaVencimiento | datetime | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FkOfertasFinanciacionPrestamosTipos | tinyint | YES |
