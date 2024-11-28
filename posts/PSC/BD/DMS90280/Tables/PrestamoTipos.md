# Table: PrestamoTipos

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkPrestamoTipos_Iden | smallint | NO |
| Descripcion | nvarchar | NO |
| FkPrestamoTiposInternos | smallint | NO |
| FkAlquilerCargoTipos | nvarchar | YES |
| FkVariosCodigos | nvarchar | YES |
| AfectaRentabilidad | bit | NO |
| FkModulos | nvarchar | YES |
| FkInformes | smallint | YES |
| FkAplicacionEventos_Cabecera | smallint | YES |
| FkMensajes_Cabecera | int | YES |
| FkAplicacionEventos_Cuerpo | smallint | YES |
| FkMensajes_Cuerpo | int | YES |
| FkAplicacionEventos_Pie | smallint | YES |
| FkMensajes_Pie | int | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FkAplicacionEventos_Trasero | smallint | YES |
| FkMensajes_Trasero | int | YES |
| FkSecciones | int | YES |
| FkEntidades | nvarchar | YES |
| FkAplicacionEventos_AlquilerPie | smallint | YES |
| FkMensajes_AlquilerPie | int | YES |
| EnviarMensaje | bit | NO |
| FechaBaja | datetime | YES |
