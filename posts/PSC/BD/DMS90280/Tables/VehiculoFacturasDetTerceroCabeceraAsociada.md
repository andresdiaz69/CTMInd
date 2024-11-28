# Table: VehiculoFacturasDetTerceroCabeceraAsociada

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkVehiculos | int | NO |
| PkFkVehiculoFacturas | smallint | NO |
| PkFkTerceros | int | NO |
| PkFkAñoFactura | nvarchar | NO |
| PkFkSeries_Factura | nvarchar | NO |
| PkFkNumFactura | nvarchar | NO |
| PkFkTerceros_Asociado | int | NO |
| NombreTratamiento | nvarchar | YES |
| NombreTercero | nvarchar | YES |
| NifCif | nvarchar | YES |
| FkCalleTipos | nvarchar | YES |
| NombreCalle | nvarchar | YES |
| Numero | nvarchar | YES |
| Bloque | nvarchar | YES |
| Piso | nvarchar | YES |
| Puerta | nvarchar | YES |
| Complemento | nvarchar | YES |
| FkPaises | nvarchar | YES |
| FkCodigosPostales | nvarchar | YES |
| Poblacion | nvarchar | YES |
| Provincia | nvarchar | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FkRelacionTerceroCabeceraTipos | nvarchar | NO |
| FkTerceroDirecciones | smallint | YES |
