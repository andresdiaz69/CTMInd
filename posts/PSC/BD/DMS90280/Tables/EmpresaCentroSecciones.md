# Table: EmpresaCentroSecciones

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| cod_empresa | smallint | NO |
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| Nombre_empresa | nvarchar | NO |
| cod_centro | smallint | NO |
| PkFkSecciones | int | NO |
| UserMod | smallint | NO |
| nombre_centro | nvarchar | NO |
| cod_seccion | int | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| nombre_seccion | nvarchar | YES |
| departamento | nvarchar | NO |
| FechaBaja | datetime | YES |
| MecanicaRapida | bit | NO |
| UbicacionGenerica | bit | NO |
| FechaMod | datetime | NO |
| MecanicaRapidaOficial | bit | NO |
| FkEquipoMecanico | nvarchar | YES |
| ConversionReferenciaPorMenor | bit | NO |
| CarroceriaRapida | bit | NO |
| Generica | bit | NO |
| FkUbicaciones_CrossDockingClientes | nvarchar | YES |
| CodigoEstablecimientoDestino | nvarchar | YES |
| CashPooling | bit | YES |
| BloquearCambioUbicaciones | bit | NO |
