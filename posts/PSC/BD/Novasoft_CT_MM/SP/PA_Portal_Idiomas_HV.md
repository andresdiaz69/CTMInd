# Stored Procedure: PA_Portal_Idiomas_HV

## Usa los objetos:
- [[GTH_Calificacion]]
- [[rhh_emplea]]
- [[rhh_idioma]]
- [[rhh_portal_idioma]]
- [[rhh_tbidioma]]

```sql
CREATE PROCEDURE [dbo].[PA_Portal_Idiomas_HV] @cod_emp CHAR(12) = NULL, 
                                             @cod_idi CHAR(2)  = NULL, 
                                             @opc     CHAR(1)  = 'A'  --A-ACTUALIZA, N-NUEVO
--WITH ENCRYPTION	
AS
    BEGIN
        SET @cod_emp = ISNULL(@cod_emp, '%');
        IF(@opc = 'A')
            BEGIN
                SELECT DISTINCT 
                       CONVERT(VARCHAR(255), EXT.Descripcion) AS Descripcion, 
                       CONVERT(VARCHAR(255), TA.cod_emp) AS cod_emp, 
                       CONVERT(VARCHAR(255), TA.campo) AS campo, 
                       CONVERT(VARCHAR(255), TN2.valor_actual) AS valor_actual, 
                       CONVERT(VARCHAR(255), valor_nuevo) AS valor_nuevo
                FROM
                (	
                    --Se consultan los datos actuales de la HV del empleado
                    SELECT A.cod_emp, 
                           A.cod_idi, 
                           RTRIM(B.nom_emp) + ' ' + RTRIM(B.ap1_emp) + ' ' + RTRIM(B.ap2_emp) AS 'nom_emp', 
                           C.nom_idi, 
                           RTRIM(a.cod_calif) + '_' + E.Txt_Calif AS 'cod_calif' 
                    ----Campos para comparar con los nuevos
                    --D.cod_emp as 'T.cod_emp', D.cod_idi as 'T.cod_idi', F.Txt_Calif AS 'T.Txt_Calif'
                    --===================================
                    FROM rhh_portal_idioma A
                         INNER JOIN rhh_emplea B ON B.cod_emp = A.cod_emp COLLATE DATABASE_DEFAULT
                         LEFT JOIN rhh_tbidioma C ON C.cod_idi = A.cod_idi COLLATE DATABASE_DEFAULT
                         LEFT JOIN rhh_idioma D ON A.cod_emp = D.cod_emp COLLATE DATABASE_DEFAULT
                                                   AND A.cod_idi = D.cod_idi COLLATE DATABASE_DEFAULT
                         LEFT JOIN GTH_Calificacion E ON E.cod_calif = A.cod_calif COLLATE DATABASE_DEFAULT
                         LEFT JOIN GTH_Calificacion F ON F.cod_calif = D.cod_calif COLLATE DATABASE_DEFAULT
                    WHERE A.cod_emp = @cod_emp
                          AND A.cod_idi = @cod_idi
                ) P UNPIVOT(valor_nuevo FOR campo IN(cod_calif)) AS TA
                LEFT JOIN
                (
                    SELECT cod_emp, 
                           campo, 
                           valor_actual
                    FROM
                    (		
                        --Se consultan los datos nuevos de la HV modificados por el empleado 
                        SELECT A.cod_emp, 
                               A.cod_idi, 
                               RTRIM(B.nom_emp) + ' ' + RTRIM(B.ap1_emp) + ' ' + RTRIM(B.ap2_emp) AS 'nom_emp', 
                               C.nom_idi, 
                               RTRIM(a.cod_calif) + '_' + E.Txt_Calif AS 'cod_calif', 
                               --Campos para comparar con los nuevos
                               D.cod_emp AS 'T.cod_emp', 
                               D.cod_idi AS 'T.cod_idi', 
                               F.Txt_Calif AS 'T.Txt_Calif'
                        --===================================
                        FROM rhh_idioma A
                             INNER JOIN rhh_emplea B ON B.cod_emp = A.cod_emp COLLATE DATABASE_DEFAULT
                             LEFT JOIN rhh_tbidioma C ON C.cod_idi = A.cod_idi COLLATE DATABASE_DEFAULT
                             LEFT JOIN rhh_idioma D ON A.cod_emp = D.cod_emp COLLATE DATABASE_DEFAULT
                                                       AND A.cod_idi = D.cod_idi COLLATE DATABASE_DEFAULT
                             LEFT JOIN GTH_Calificacion E ON E.cod_calif = A.cod_calif COLLATE DATABASE_DEFAULT
                             LEFT JOIN GTH_Calificacion F ON F.cod_calif = D.cod_calif COLLATE DATABASE_DEFAULT
                        WHERE A.cod_emp = @cod_emp
                              AND A.cod_idi = @cod_idi
                    ) P UNPIVOT(valor_actual FOR campo IN(cod_calif)) AS TN
                ) AS TN2 ON TA.campo = TN2.CAMPO --AND valor_actual<>valor_nuevo

                INNER JOIN
                (
                    SELECT c.name AS Campo, 
                           value AS Descripcion
                    FROM sys.extended_properties AS ep
                         INNER JOIN sys.tables AS t ON ep.major_id = t.object_id
                         INNER JOIN sys.columns AS c ON ep.major_id = c.object_id
                                                        AND ep.minor_id = c.column_id
                    WHERE class = 1
                          AND t.name = 'rhh_portal_idioma'
                ) AS EXT ON TA.campo = EXT.Campo
                            AND RTRIM(valor_actual) <> RTRIM(valor_nuevo);
            END;
        IF(@opc = 'N')  --PARA REGISTROS NUEVOS
            BEGIN
                SELECT DISTINCT 
                       CONVERT(VARCHAR(255), EXT.Descripcion) AS Descripcion, 
                       CONVERT(VARCHAR(255), TA.cod_emp) AS cod_emp, 
                       CONVERT(VARCHAR(255), TA.campo) AS campo, 
                       CONVERT(VARCHAR(255), TN2.valor_actual) AS valor_actual, 
                       CONVERT(VARCHAR(255), valor_nuevo) AS valor_nuevo
                FROM
                (	
                    --Se consultan los datos actuales de la HV del empleado
                    SELECT A.cod_emp, 
                           A.cod_idi, 
                           RTRIM(B.nom_emp) + ' ' + RTRIM(B.ap1_emp) + ' ' + RTRIM(B.ap2_emp) AS 'nom_emp', 
                           C.nom_idi, 
                           RTRIM(a.cod_calif) + '_' + E.Txt_Calif AS 'cod_calif' 
                    ----Campos para comparar con los nuevos
                    --D.cod_emp as 'T.cod_emp', D.cod_idi as 'T.cod_idi', F.Txt_Calif AS 'T.Txt_Calif'
                    --===================================
                    FROM rhh_portal_idioma A
                         INNER JOIN rhh_emplea B ON B.cod_emp = A.cod_emp COLLATE DATABASE_DEFAULT
                         LEFT JOIN rhh_tbidioma C ON C.cod_idi = A.cod_idi COLLATE DATABASE_DEFAULT
                         LEFT JOIN rhh_idioma D ON A.cod_emp = D.cod_emp COLLATE DATABASE_DEFAULT
                                                   AND A.cod_idi = D.cod_idi COLLATE DATABASE_DEFAULT
                         LEFT JOIN GTH_Calificacion E ON E.cod_calif = A.cod_calif COLLATE DATABASE_DEFAULT
                         LEFT JOIN GTH_Calificacion F ON F.cod_calif = D.cod_calif COLLATE DATABASE_DEFAULT
                    WHERE A.cod_emp = @cod_emp
                          AND A.cod_idi = @cod_idi
                ) P UNPIVOT(valor_nuevo FOR campo IN(cod_calif)) AS TA
                LEFT JOIN
                (
                    SELECT cod_emp, 
                           campo, 
                           valor_actual
                    FROM
                    (		
                        --Se consultan los datos nuevos de la HV modificados por el empleado 
                        SELECT A.cod_emp, 
                               A.cod_idi, 
                               RTRIM(B.nom_emp) + ' ' + RTRIM(B.ap1_emp) + ' ' + RTRIM(B.ap2_emp) AS 'nom_emp', 
                               C.nom_idi, 
                               RTRIM(a.cod_calif) + '_' + E.Txt_Calif AS 'cod_calif', 
                               --Campos para comparar con los nuevos
                               D.cod_emp AS 'T.cod_emp', 
                               D.cod_idi AS 'T.cod_idi', 
                               F.Txt_Calif AS 'T.Txt_Calif'
                        --===================================
                        FROM rhh_idioma A
                             INNER JOIN rhh_emplea B ON B.cod_emp = A.cod_emp COLLATE DATABASE_DEFAULT
                             LEFT JOIN rhh_tbidioma C ON C.cod_idi = A.cod_idi COLLATE DATABASE_DEFAULT
                             LEFT JOIN rhh_idioma D ON A.cod_emp = D.cod_emp COLLATE DATABASE_DEFAULT
                                                       AND A.cod_idi = D.cod_idi COLLATE DATABASE_DEFAULT
                             LEFT JOIN GTH_Calificacion E ON E.cod_calif = A.cod_calif COLLATE DATABASE_DEFAULT
                             LEFT JOIN GTH_Calificacion F ON F.cod_calif = D.cod_calif COLLATE DATABASE_DEFAULT
                        WHERE A.cod_emp = @cod_emp
                              AND A.cod_idi = @cod_idi
                    ) P UNPIVOT(valor_actual FOR campo IN(cod_calif)) AS TN
                ) AS TN2 ON TA.campo = TN2.CAMPO --AND valor_actual<>valor_nuevo

                INNER JOIN
                (
                    SELECT c.name AS Campo, 
                           value AS Descripcion
                    FROM sys.extended_properties AS ep
                         INNER JOIN sys.tables AS t ON ep.major_id = t.object_id
                         INNER JOIN sys.columns AS c ON ep.major_id = c.object_id
                                                        AND ep.minor_id = c.column_id
                    WHERE class = 1
                          AND t.name = 'rhh_portal_idioma'
                ) AS EXT ON TA.campo = EXT.Campo; 
                --  GTH_Calificacion
            END;
    END;

```
