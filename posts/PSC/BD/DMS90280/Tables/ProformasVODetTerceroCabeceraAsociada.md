# Table: ProformasVODetTerceroCabeceraAsociada

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkFkTerceros | int | NO |
| PkFkClientesPotEntradas | smallint | NO |
| PkFkOfertasVO | smallint | NO |
| PkFkProformasVO | int | NO |
| PkFkTerceros_ProformaVO | int | NO |
| PkFkAñoProformaVO | nvarchar | NO |
| PkFkSeries_ProformaVO | nvarchar | NO |
| PkFkNumProformaVO | nvarchar | NO |
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
